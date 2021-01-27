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
import { Field, Int, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";

@ObjectType()
@Entity()
@Unique(["sessionId", "userId"])
export class SessionAllocation extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Session)
    @ManyToOne(() => Session, (session) => session.sessionAllocations, {
        lazy: true,
    })
    session: Lazy<Session>;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.sessionAllocations, { lazy: true })
    user: Lazy<User>;

    @Column()
    sessionId: number;

    @Column()
    userId: number;
}
