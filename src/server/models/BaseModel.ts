import { User } from "../entities";
import { CANT_FIND, PERM_ERR } from "../constants";
import { DeleteInput } from "../inputs/DeleteInput";
import { BaseEntity } from "../entities/BaseEntity";
import { DeepPartial, ObjectType } from "typeorm";
import asyncFilter from "node-filter-async";

export type Model = ReturnType<typeof BaseModel>;

export const BaseModel = <T extends BaseEntity>() => {
    abstract class AbstractBaseModel {
        protected static entityCls: ObjectType<T>;

        protected static async canRead(obj: T, user: User): Promise<boolean> {
            return user.isAdmin;
        }

        protected static async canUpdate(
            toUpdate: T,
            updatedFields: DeepPartial<T>,
            user: User
        ): Promise<boolean> {
            return user.isAdmin;
        }

        protected static async canDelete(
            toDelete: T,
            user: User
        ): Promise<boolean> {
            return user.isAdmin;
        }

        /**
         * Important: Note that this method is static
         * @param toCreate
         * @param user
         */
        protected static async canCreate(
            toCreate: T,
            user: User
        ): Promise<boolean> {
            return user.isAdmin;
        }

        public static async get(
            entityLike: DeepPartial<T>,
            user: User
        ): Promise<T> {
            const result: T | undefined = await (this.entityCls as any).findOne(
                entityLike
            );
            if (!result) {
                throw new Error(CANT_FIND + this.entityCls.name);
            }
            if (await this.canRead(result, user)) {
                return result;
            }
            throw new Error(PERM_ERR);
        }

        public static async getMany(
            entityLike: DeepPartial<T>,
            user: User
        ): Promise<T[]> {
            const results = await (this.entityCls as any).find(entityLike);
            return await asyncFilter(
                results,
                async (result) => await this.canRead(result, user)
            );
        }

        public static async getById(entityId: T["id"], user: User): Promise<T> {
            try {
                return await (this.entityCls as any).loaders.load(entityId);
            } catch (e) {
                throw new Error(CANT_FIND + this.entityCls.name);
            }
        }

        public static async create(
            entityLike: DeepPartial<T>,
            user: User
        ): Promise<T> {
            const toCreate: T = (this.entityCls as any).create(entityLike);
            if (await this.canCreate(toCreate, user)) {
                return await toCreate.save();
            }
            throw new Error(PERM_ERR);
        }

        public static async update(
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
            if (await this.canUpdate(toUpdate, updatedFields, user)) {
                toUpdate = {
                    ...toUpdate,
                    ...updatedFields,
                };
                return await toUpdate.save();
            }
            throw new Error(PERM_ERR);
        }

        public static async delete(
            deleteCriteria: DeepPartial<T>,
            user: User
        ): Promise<T> {
            const deleteCandidates: T[] = (this.entityCls as any).find(
                deleteCriteria
            );
            if (deleteCandidates.length === 0) {
                throw new Error(CANT_FIND);
            }
            if (deleteCandidates.length > 1) {
                throw new Error(
                    `Multiple ${this.entityCls.name} objects found due to ambiguous fields`
                );
            }
            const toDelete = deleteCandidates[0];
            if (!toDelete) {
                throw new Error(CANT_FIND);
            }
            if (await this.canDelete(toDelete, user)) {
                return await toDelete.remove();
            }
            throw new Error(PERM_ERR);
        }
    }

    return AbstractBaseModel;
};
