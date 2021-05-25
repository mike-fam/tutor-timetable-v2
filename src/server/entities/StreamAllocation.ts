import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { SessionStream } from "./SessionStream";
import { User } from "./User";
import { Field, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";
import { BaseEntity } from "./BaseEntity";

@ObjectType()
@Entity()
@Unique(["sessionStreamId", "userId"])
export class StreamAllocation extends BaseEntity {
    @Field(() => SessionStream)
    @ManyToOne(
        () => SessionStream,
        (sessionStream) => sessionStream.streamAllocations,
        { lazy: true }
    )
    sessionStream: Lazy<SessionStream>;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.streamAllocations, { lazy: true })
    user: Lazy<User>;

    @Column()
    sessionStreamId: string;

    @Column()
    userId: string;
}
