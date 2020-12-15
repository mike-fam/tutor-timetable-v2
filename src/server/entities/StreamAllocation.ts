import {
    BaseEntity,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { SessionStream } from "./SessionStream";
import { User } from "./User";

@Entity()
@Unique(["sessionStream", "user"])
export class StreamAllocation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => SessionStream,
        (sessionStream) => sessionStream.streamAllocations
    )
    sessionStream: SessionStream;

    @ManyToOne(() => User, (user) => user.streamAllocations)
    user: User;
}
