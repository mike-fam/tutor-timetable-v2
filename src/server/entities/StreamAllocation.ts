import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { SessionStream } from "./SessionStream";
import { User } from "./User";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
@Unique(["sessionStream", "user"])
export class StreamAllocation extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => SessionStream)
    @ManyToOne(
        () => SessionStream,
        (sessionStream) => sessionStream.streamAllocations
    )
    sessionStream: SessionStream;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.streamAllocations)
    user: User;
}
