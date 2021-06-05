import { User } from "../entities";
import { CANT_FIND, PERM_ERR } from "../constants";
import { BaseEntity } from "../entities/BaseEntity";
import { DeepPartial, ObjectType } from "typeorm";
import asyncFilter from "node-filter-async";
import { PermissionState } from "../types/permission";
import DataLoader from "dataloader";

export abstract class BaseModel<T extends BaseEntity> {
    protected loader: DataLoader<string, T>;
    protected entityCls: ObjectType<T>;

    public async permRead(obj: T, user: User): Promise<PermissionState> {
        if (user.isAdmin) {
            return { hasPerm: true };
        }
        return await this.canRead(obj, user);
    }

    public async permUpdate(
        toUpdate: T,
        updatedFields: DeepPartial<T>,
        user: User
    ): Promise<PermissionState> {
        if (user.isAdmin) {
            return { hasPerm: true };
        }
        return await this.canUpdate(toUpdate, updatedFields, user);
    }

    public async permDelete(toDelete: T, user: User): Promise<PermissionState> {
        if (user.isAdmin) {
            return { hasPerm: true };
        }
        return await this.canDelete(toDelete, user);
    }

    public async permCreate(toCreate: T, user: User): Promise<PermissionState> {
        if (user.isAdmin) {
            return { hasPerm: true };
        }
        return await this.canCreate(toCreate, user);
    }

    protected async canRead(obj: T, user: User): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }

    protected async canUpdate(
        toUpdate: T,
        updatedFields: DeepPartial<T>,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }

    protected async canDelete(
        toDelete: T,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }

    protected async canCreate(
        toCreate: T,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }

    public async get(entityLike: DeepPartial<T>, user: User): Promise<T> {
        const result: T | undefined = await (this.entityCls as any).findOne(
            entityLike
        );
        if (!result) {
            throw new Error(CANT_FIND + this.entityCls.name);
        }
        const { hasPerm, errMsg } = await this.permRead(result, user);
        if (hasPerm) {
            return result;
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async getMany(entityLike: DeepPartial<T>, user: User): Promise<T[]> {
        const results = await (this.entityCls as any).find(entityLike);
        return await asyncFilter(results, async (result) => {
            const { hasPerm } = await this.permRead(result, user);
            return hasPerm;
        });
    }

    public async getById(entityId: string, user: User): Promise<T> {
        let result: T;
        try {
            result = (await this.loader.load(entityId)) as T;
        } catch (e) {
            throw new Error(CANT_FIND + this.entityCls.name);
        }
        const { hasPerm, errMsg } = await this.permRead(result, user);
        if (hasPerm) {
            return result;
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async getByIds(entityIds: string[], user: User): Promise<T[]> {
        const results = await this.loader.loadMany(entityIds);
        return (await asyncFilter(results, async (result) => {
            if (result instanceof Error) {
                return false;
            } else {
                return (await this.permRead(result, user)).hasPerm;
            }
        })) as T[];
    }

    public async create(entityLike: DeepPartial<T>, user: User): Promise<T> {
        const toCreate: T = (this.entityCls as any).create(entityLike);
        const { hasPerm, errMsg } = await this.permCreate(toCreate, user);
        if (hasPerm) {
            return await toCreate.save();
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async update(
        toUpdateFind: DeepPartial<T>,
        updatedFields: DeepPartial<T>,
        user: User
    ): Promise<T> {
        const updateCandidates: T[] = (this.entityCls as any).find(
            toUpdateFind
        );
        if (updateCandidates.length === 0) {
            throw new Error(CANT_FIND);
        }
        if (updateCandidates.length > 1) {
            throw new Error(
                `Multiple ${this.entityCls.name} objects found due to ambiguous fields`
            );
        }
        let toUpdate = updateCandidates[0];
        const { hasPerm, errMsg } = await this.permUpdate(
            toUpdate,
            updatedFields,
            user
        );
        if (hasPerm) {
            toUpdate = {
                ...toUpdate,
                ...updatedFields,
            };
            return await toUpdate.save();
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async delete(
        deleteCriteria: DeepPartial<T>,
        user: User
    ): Promise<T> {
        const deleteCandidates: T[] = (this.entityCls as any).find(
            deleteCriteria
        );
        if (deleteCandidates.length === 0) {
            throw new Error(CANT_FIND + this.entityCls.name);
        }
        if (deleteCandidates.length > 1) {
            throw new Error(
                `Multiple ${this.entityCls.name} objects found due to ambiguous fields`
            );
        }
        const toDelete = deleteCandidates[0];
        if (!toDelete) {
            throw new Error(CANT_FIND + this.entityCls.name);
        }
        const { hasPerm, errMsg } = await this.permDelete(toDelete, user);
        if (hasPerm) {
            return await toDelete.remove();
        }
        throw new Error(errMsg || PERM_ERR);
    }
}
