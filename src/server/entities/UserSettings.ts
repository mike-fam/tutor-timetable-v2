import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Lazy } from "../utils/query";

@ObjectType()
@Entity()
export class UserSettings extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => User)
    @OneToOne(() => User, { lazy: true })
    user: Lazy<User>;
}
