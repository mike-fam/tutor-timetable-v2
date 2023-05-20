import { User } from "../entities";
import { CANT_FIND, PERM_ERR } from "../constants";
import { BaseEntity } from "../entities/BaseEntity";
import {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
} from "typeorm";
import { PermissionState } from "../types/permission";
import DataLoader from "dataloader";
import has from "lodash/has";
import { DataLoaders } from "../types/dataloaders";
import { asyncFilter, asyncMap } from "../../utils/array";

type PartialWithId<T extends BaseEntity> = DeepPartial<T> & { id: string };

/**
 * @template T entity type of model
 */
export abstract class BaseModel<T extends BaseEntity> {
    protected loader: DataLoader<string, T>;
    protected entityCls: { new (): T } & typeof BaseEntity;

    protected constructor(protected loaders: DataLoaders) {}

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

    public async get(entityLike: FindOneOptions<T>, user: User): Promise<T> {
        const result = await this.entityCls.findOne<T>(entityLike);
        if (!result) {
            throw new Error(CANT_FIND + this.entityCls.name);
        }
        const { hasPerm, errMsg } = await this.permRead(result, user);
        if (hasPerm) {
            return result;
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async getBy(
        entityLike: FindOptionsWhere<T>,
        user: User
    ): Promise<T> {
        const result = await this.entityCls.findOneBy<T>(entityLike);
        if (!result) {
            throw new Error(CANT_FIND + this.entityCls.name);
        }
        const { hasPerm, errMsg } = await this.permRead(result, user);
        if (hasPerm) {
            return result;
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async getIfExists(
        entityLike: FindOneOptions<T>,
        user: User
    ): Promise<T | null> {
        const result = await this.entityCls.findOne<T>(entityLike);
        if (!result) {
            return null;
        }
        const { hasPerm, errMsg } = await this.permRead(result, user);
        if (hasPerm) {
            return result;
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async getIfExistsBy(
        entityLike: FindOptionsWhere<T>,
        user: User
    ): Promise<T | null> {
        const result = await this.entityCls.findOneBy<T>(entityLike);
        if (!result) {
            return null;
        }
        const { hasPerm, errMsg } = await this.permRead(result, user);
        if (hasPerm) {
            return result;
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async getMany(
        findOptions: FindManyOptions<T>,
        user: User
    ): Promise<T[]> {
        const results = await this.entityCls.find<T>(findOptions);
        return await asyncFilter(results, async (result) => {
            const { hasPerm } = await this.permRead(result, user);
            return hasPerm;
        });
    }

    public async getManyBy(
        entityLike: FindOptionsWhere<T>,
        user: User
    ): Promise<T[]> {
        const results = await this.entityCls.findBy<T>(entityLike);
        return await asyncFilter(results, async (result) => {
            const { hasPerm } = await this.permRead(result, user);
            return hasPerm;
        });
    }

    public async getById(entityId: string, user: User): Promise<T> {
        let result: T;
        try {
            result = await this.loader.load(entityId);
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
        const toCreate = this.entityCls.create<T>(entityLike);
        const { hasPerm, errMsg } = await this.permCreate(toCreate, user);
        if (hasPerm) {
            return await toCreate.save();
        }
        throw new Error(errMsg || PERM_ERR);
    }

    public async createMany(
        entityLike: DeepPartial<T>[],
        user: User
    ): Promise<T[]> {
        const toCreate = this.entityCls.create<T>(entityLike);
        for (const obj of toCreate) {
            const { hasPerm, errMsg } = await this.permCreate(obj, user);
            if (!hasPerm) {
                throw new Error(errMsg || PERM_ERR);
            }
        }
        return await this.entityCls.save<T>(toCreate);
    }

    public async updateMany(
        toUpdateFind: FindOptionsWhere<T>,
        updatedFields: DeepPartial<T>,
        user: User
    ): Promise<T[]> {
        const toUpdate = await this.entityCls.findBy<T>(toUpdateFind);
        return await this.entityCls.save<T>(
            await asyncMap(toUpdate, async (updateCandidate) => {
                const { hasPerm, errMsg } = await this.permUpdate(
                    updateCandidate,
                    updatedFields,
                    user
                );
                if (!hasPerm) {
                    throw new Error(errMsg || PERM_ERR);
                }
                return {
                    ...updateCandidate,
                    ...updatedFields,
                };
            })
        );
    }

    public async update(
        toUpdateFind: FindOptionsWhere<T>,
        updatedFields: DeepPartial<T>,
        user: User
    ): Promise<T> {
        let toUpdate: T;
        if (toUpdateFind instanceof this.entityCls) {
            toUpdate = toUpdateFind as T;
        } else {
            const updateCandidates = await this.entityCls.findBy<T>(
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
            toUpdate = updateCandidates[0];
        }
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
            return await this.entityCls.save<T>(toUpdate);
        }
        throw new Error(errMsg || PERM_ERR);
    }

    save(toSave: DeepPartial<T>[], user: User): Promise<T[]>;
    save(toSave: DeepPartial<T>, user: User): Promise<T>;

    public async save(
        toSave: DeepPartial<T> | DeepPartial<T>[],
        user: User
    ): Promise<T[] | T> {
        let entityArr: DeepPartial<T>[];
        let ret: T[] = [];
        if (Array.isArray(toSave)) {
            entityArr = toSave;
        } else {
            entityArr = [toSave];
        }
        const toCreate = entityArr.filter((entity) => !has(entity, "id"));
        const updatedFields = entityArr.filter((entity) =>
            has(entity, "id")
        ) as PartialWithId<T>[];
        ret.push(...(await this.createMany(toCreate, user)));
        for (const toUpdateEntity of updatedFields) {
            const entity = await this.getById(toUpdateEntity.id, user);
            const { hasPerm, errMsg } = await this.permUpdate(
                entity,
                toUpdateEntity,
                user
            );
            if (!hasPerm) {
                throw new Error(errMsg || PERM_ERR);
            }
        }
        ret.push(...(await this.entityCls.save<T>(updatedFields)));
        return ret;
    }

    public async delete(
        deleteCriteria: FindOptionsWhere<T>,
        user: User
    ): Promise<T> {
        const deleteCandidates = await this.entityCls.findBy<T>(deleteCriteria);
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

    public async deleteMany(
        deleteCriteria: FindManyOptions<T>,
        user: User
    ): Promise<T[]> {
        const deleteCandidates = await this.entityCls.find<T>(deleteCriteria);
        for (const toDelete of deleteCandidates) {
            const { hasPerm, errMsg } = await this.permDelete(toDelete, user);
            if (!hasPerm) {
                throw new Error(errMsg || PERM_ERR);
            }
        }
        return await this.entityCls.remove<T>(deleteCandidates);
    }

    public async deleteManyBy(
        deleteCriteria: FindOptionsWhere<T>,
        user: User
    ): Promise<T[]> {
        const deleteCandidates = await this.entityCls.findBy<T>(deleteCriteria);
        for (const toDelete of deleteCandidates) {
            const { hasPerm, errMsg } = await this.permDelete(toDelete, user);
            if (!hasPerm) {
                throw new Error(errMsg || PERM_ERR);
            }
        }
        return await this.entityCls.remove<T>(deleteCandidates);
    }

    /**
     * Determines if a user can read an object
     *
     * @param {T} _ Object to be read
     * @param {User} user user performing this action: User performing the reading
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(_: T, user: User): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }

    /**
     * Determines if a user can update an object
     *
     * @param {T} _ object to be updated
     * @param {Partial<T>} __ updated fields
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canUpdate(
        _: T,
        __: DeepPartial<T>,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }

    /**
     * Determines if a user can delete an object
     *
     * @param {T} _ object to be deleted
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canDelete(_: T, user: User): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }

    /**
     * Determines if a user can create an object
     *
     * @param {T} _ object to be created
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canCreate(_: T, user: User): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }
}
