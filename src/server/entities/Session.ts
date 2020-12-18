import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { SessionStream } from "./SessionStream";
import { SessionAllocation } from "./SessionAllocation";
import { StaffRequest } from "./StaffRequest";

@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SessionStream, (sessionStream) => sessionStream.sessions)
    sessionStream: SessionStream;

    @Column("varchar", { length: 15 })
    location: string;

    @Column()
    week: number;

    @OneToMany(
        () => SessionAllocation,
        (sessionAllocation) => sessionAllocation.session
    )
    sessionAllocations: SessionAllocation[];

    @OneToMany(() => StaffRequest, (request) => request.session)
    requests: StaffRequest[];
}
