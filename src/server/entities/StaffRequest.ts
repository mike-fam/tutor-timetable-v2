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

@ObjectType()
@Entity()
@Unique(["requester", "session"])
export class StaffRequest extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.requests)
    requester: User;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.acceptedRequests)
    acceptor: User;

    @Field(() => User)
    @ManyToOne(() => User)
    finaliser: User;

    @Field(() => Session)
    @ManyToOne(() => Session, (session) => session.requests)
    session: Session;
}
