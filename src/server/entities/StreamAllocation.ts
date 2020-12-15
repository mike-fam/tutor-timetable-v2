import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionStream } from "./SessionStream";
import { User } from "./User";

@Entity()
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
