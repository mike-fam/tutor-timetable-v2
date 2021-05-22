import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { User } from "./User";
import { Session } from "./Session";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";

@ObjectType()
@Entity()
@Unique(["sessionId", "userId"])
export class SessionAllocation extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => Session)
    @ManyToOne(() => Session, (session) => session.sessionAllocations, {
        lazy: true,
    })
    session: Lazy<Session>;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.sessionAllocations, { lazy: true })
    user: Lazy<User>;

    @Column()
    sessionId: string;

    @Column()
    userId: string;
}
