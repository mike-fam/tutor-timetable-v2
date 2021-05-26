import {
    BaseEntity as TypeOrmBaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Permission } from "../types/permission";

@ObjectType()
export abstract class BaseEntity extends TypeOrmBaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

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
