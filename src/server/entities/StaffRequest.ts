import {
    BaseEntity,
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
@Unique(["requester", "session"])
export class StaffRequest extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.requests, { lazy: true })
    requester: Lazy<User>;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.acceptedRequests, { lazy: true })
    acceptor: Lazy<User>;

    @Field(() => User)
    @ManyToOne(() => User, { lazy: true })
    finaliser: Lazy<User>;

    @Field(() => Session)
    @ManyToOne(() => Session, (session) => session.requests, { lazy: true })
    session: Lazy<Session>;
}
