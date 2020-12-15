import {
    BaseEntity,
    Check,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Timetable } from "./Timetable";
import { SessionType } from "../../types/session";
import { checkFieldValueInEnum } from "../utils/query";
import { IsoDay } from "../../types/date";
import { Session } from "./Session";
import { StreamAllocation } from "./StreamAllocation";

// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "type"))
// Day is a valid Iso Day number
@Check(checkFieldValueInEnum(IsoDay, "day", true))
@Entity()
export class SessionStream extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Timetable, (timetable) => timetable.sessionStreams)
    timetable: Timetable;

    @Column("varchar", { length: 32 })
    name: string;

    @Column("varchar", { length: 15 })
    type: SessionType;

    @Column("int")
    day: IsoDay;

    @Column("float")
    startTime: number;

    @Column("float")
    endTime: number;

    @Column("int", { array: true })
    weeks: Array<number>;

    @Column("varchar", { length: 15 })
    location: string;

    @OneToMany(() => Session, (session) => session.sessionStream)
    sessions: Session[];

    @OneToMany(
        () => StreamAllocation,
        (streamAllocation) => streamAllocation.sessionStream
    )
    streamAllocations: StreamAllocation[];
}
