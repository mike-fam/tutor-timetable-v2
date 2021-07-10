import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./BaseEntity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { User } from "./User";
import { Lazy } from "../utils/query";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.notifications)
    user: Lazy<User>;

    @Column()
    @RelationId((notification: Notification) => notification.user)
    userId: string;
}
