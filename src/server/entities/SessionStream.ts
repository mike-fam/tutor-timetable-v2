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
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "type"))
// Day is a valid Iso Day number
@Check(checkFieldValueInEnum(IsoDay, "day", true))
export class SessionStream extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Timetable)
    @ManyToOne(() => Timetable, (timetable) => timetable.sessionStreams)
    timetable: Timetable;

    @Field(() => Int)
    @Column()
    timetableId: number;

    @Field()
    @Column("varchar", { length: 32 })
    name: string;

    @Field(() => SessionType)
    @Column("varchar", { length: 15 })
    type: SessionType;

    @Field(() => IsoDay)
    @Column("int")
    day: IsoDay;

    @Field()
    @Column("float")
    startTime: number;

    @Field()
    @Column("float")
    endTime: number;

    @Field(() => [Int])
    @Column("int", { array: true })
    weeks: Array<number>;

    @Field()
    @Column("varchar", { length: 15 })
    location: string;

    @Field(() => [Session])
    @OneToMany(() => Session, (session) => session.sessionStream)
    sessions: Session[];

    @Field(() => [StreamAllocation])
    @OneToMany(
        () => StreamAllocation,
        (streamAllocation) => streamAllocation.sessionStream,
        { eager: true, cascade: ["insert"] }
    )
    streamAllocations: StreamAllocation[];
}
