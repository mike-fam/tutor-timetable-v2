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
@Unique(["session", "user"])
export class SessionAllocation extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Session)
    @ManyToOne(() => Session, (session) => session.sessionAllocations)
    session: Session;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.sessionAllocations)
    user: User;
}
