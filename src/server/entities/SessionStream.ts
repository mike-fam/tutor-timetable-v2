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
import { Utils } from "../utils/Util";
import { User } from "./User";

@ObjectType()
@Entity()
// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "type"))
// Day is a valid Iso Day number
@Check(checkFieldValueInEnum(IsoDay, "day", true))
export class SessionStream
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity {
    @RelationId((stream: SessionStream) => stream.timetable)
    @Column()
    timetableId: string;

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

    @OneToMany(() => Session, (session) => session.sessionStream, {
        lazy: true,
    })
    sessions: Lazy<Session[]>;

    @RelationId((stream: SessionStream) => stream.sessions)
    sessionIds: string[];

    @OneToMany(
        () => StreamAllocation,
        (streamAllocation) => streamAllocation.sessionStream,
        { lazy: true, cascade: ["insert"] }
    )
    streamAllocations: Lazy<StreamAllocation[]>;

    @RelationId((stream: SessionStream) => stream.streamAllocations)
    streamAllocationIds: string[];

    @OneToMany(() => SessionStream, (stream) => stream.based, {
        lazy: true,
    })
    basedStreams: Lazy<SessionStream[]>;

    @RelationId((stream: SessionStream) => stream.basedStreams)
    basedStreamIds: string[];

    @ManyToOne(() => SessionStream, (stream) => stream.basedStreams, {
        lazy: true,
        nullable: true,
    })
    based: Lazy<SessionStream>;

    @RelationId((stream: SessionStream) => stream.based)
    @Column({ nullable: true })
    basedId: string | null;

    public async getCourse(): Promise<Course> {
        const loaders = Utils.loaders;
        const timetable = await loaders.timetable.load(this.timetableId);
        return await timetable.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = Utils.loaders;
        const timetable = await loaders.timetable.load(this.timetableId);
        return await timetable.getTerm();
    }

    public async allocate(user: User): Promise<void> {
        const allocation = StreamAllocation.create({
            sessionStream: this,
            user,
        });
        await allocation.save();
    }

    public async deallocate(user: User): Promise<void> {
        const allocation = await StreamAllocation.findOne({
            sessionStream: this,
            user,
        });
        if (!allocation) {
            return;
        }
        await allocation.remove();
    }
}
