import {
    Check,
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    RelationId,
} from "typeorm";
import { Timetable } from "./Timetable";
import { SessionType } from "../types/session";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { IsoDay } from "../../types/date";
import { Session } from "./Session";
import { Field, Int, ObjectType } from "type-graphql";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";
import { Utils } from "../utils/Util";
import { User } from "./User";
import differenceBy from "lodash/differenceBy";

@ObjectType()
@Entity()
// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "type"))
// Day is a valid Iso Day number
@Check(checkFieldValueInEnum(IsoDay, "day", true))
export class SessionStream
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity
{
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

    @OneToMany(() => SessionStream, (stream) => stream.root, {
        lazy: true,
    })
    secondaryStreams: Lazy<SessionStream[]>;

    @RelationId((stream: SessionStream) => stream.secondaryStreams)
    secondaryStreamIds: string[];

    @ManyToOne(() => SessionStream, (stream) => stream.secondaryStreams, {
        lazy: true,
        nullable: true,
        onDelete: "CASCADE",
    })
    root: Lazy<SessionStream>;

    @RelationId((stream: SessionStream) => stream.root)
    @Column({ nullable: true })
    rootId: string | null;

    @ManyToMany(() => User, (user) => user.allocatedStreams, { lazy: true })
    allocatedUsers: Lazy<User[]>;

    @RelationId((stream: SessionStream) => stream.allocatedUsers)
    allocatedUserIds: string[];

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

    public async allocate(...users: User[]): Promise<void> {
        const allocatedUsers = (await Utils.loaders.user.loadMany(
            this.allocatedUserIds
        )) as User[];
        this.allocatedUsers = [...allocatedUsers, ...users];
        await this.save();
    }

    public async deallocate(...users: User[]): Promise<void> {
        const allocatedUsers = (await Utils.loaders.user.loadMany(
            this.allocatedUserIds
        )) as User[];
        this.allocatedUsers = differenceBy(
            allocatedUsers,
            users,
            (user) => user.id
        );
        await this.save();
    }

    public async clearAllocation(): Promise<void> {
        this.allocatedUsers = [];
        await this.save();
    }
}
