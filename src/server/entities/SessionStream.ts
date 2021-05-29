import {
    Check,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    RelationId,
} from "typeorm";
import { Timetable } from "./Timetable";
import { SessionType } from "../types/session";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { IsoDay } from "../../types/date";
import { Session } from "./Session";
import { StreamAllocation } from "./StreamAllocation";
import { Field, Int, ObjectType } from "type-graphql";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";

@ObjectType()
@Entity()
// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "type"))
// Day is a valid Iso Day number
@Check(checkFieldValueInEnum(IsoDay, "day", true))
export class SessionStream
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity {
    @Field()
    @RelationId((stream: SessionStream) => stream.timetable)
    @Column()
    timetableId: string;

    @Field(() => Timetable)
    @ManyToOne(() => Timetable, (timetable) => timetable.sessionStreams, {
        lazy: true,
    })
    timetable: Lazy<Timetable>;

    @Field()
    @Column("varchar", { length: 32 })
    name: string;

    @Field(() => SessionType)
    @Column("varchar", { length: 15 })
    type: SessionType;

    @Field(() => Int)
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

    @Field(() => Int)
    @Column("int")
    numberOfStaff: number;

    @Field(() => [Session])
    @OneToMany(() => Session, (session) => session.sessionStream, {
        lazy: true,
    })
    sessions: Lazy<Session[]>;

    @Field(() => [StreamAllocation])
    @OneToMany(
        () => StreamAllocation,
        (streamAllocation) => streamAllocation.sessionStream,
        { lazy: true, cascade: ["insert"] }
    )
    streamAllocations: Lazy<StreamAllocation[]>;

    @Field(() => [SessionStream])
    @OneToMany(() => SessionStream, (stream) => stream.based, {
        lazy: true,
    })
    basedStreams: Lazy<SessionStream[]>;

    @Field(() => SessionStream)
    @ManyToOne(() => SessionStream, (stream) => stream.basedStreams, {
        lazy: true,
        nullable: true,
    })
    based: Lazy<SessionStream>;

    public async getCourse(): Promise<Course> {
        const loaders = SessionStream.loaders;
        const timetable = await loaders.timetable.load(this.timetableId);
        return await timetable.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = SessionStream.loaders;
        const timetable = await loaders.timetable.load(this.timetableId);
        return await timetable.getTerm();
    }
}
