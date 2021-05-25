import { Field, ObjectType } from "type-graphql";
import { Entity, OneToOne } from "typeorm";
import { User } from "./User";
import { Lazy } from "../utils/query";
import { BaseEntity } from "./BaseEntity";

@ObjectType()
@Entity()
export class UserSettings extends BaseEntity {
    @Field(() => User)
    @OneToOne(() => User, { lazy: true })
    user: Lazy<User>;
}
