import {
    BaseEntity as TypeOrmBaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Permission } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";

@ObjectType()
export abstract class BaseEntity extends TypeOrmBaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    protected static loaders: DataLoaders;

    public static setLoaders(loaders: DataLoaders) {
        this.loaders = loaders;
    }

    public async hasPermission(
        user: User,
        permission: Permission
    ): Promise<boolean> {
        if (user.isAdmin) {
            return true;
        }
        throw new Error("You don't have permission to perform this action");
    }
}
