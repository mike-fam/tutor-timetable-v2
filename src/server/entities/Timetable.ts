import {
    Check,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    RelationId,
    Unique,
} from "typeorm";
import { Course } from "./Course";
import { Term } from "./Term";
import { CourseStaff } from "./CourseStaff";
import { SessionStream } from "./SessionStream";
import { Field, ObjectType } from "type-graphql";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { FreezeState } from "../types/timetable";
import { Utils } from "../utils/Util";

@ObjectType()
@Entity()
@Unique(["course", "term"])
@Check(checkFieldValueInEnum(FreezeState, "permanentRequestLock"))
@Check(checkFieldValueInEnum(FreezeState, "temporaryRequestLock"))
export class Timetable
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity {
    @RelationId((timetable: Timetable) => timetable.course)
    @Column()
    courseId: string;

    @RelationId((timetable: Timetable) => timetable.term)
    @Column()
    termId: string;

    @ManyToOne(() => Course, (course) => course.timetables, { lazy: true })
    course: Lazy<Course>;

    @ManyToOne(() => Term, (term) => term.timetables, { lazy: true })
    term: Lazy<Term>;

    @OneToMany(() => CourseStaff, (courseStaff) => courseStaff.timetable, {
        lazy: true,
    })
    courseStaffs: Lazy<CourseStaff[]>;

    @RelationId((timetable: Timetable) => timetable.courseStaffs)
    courseStaffIds: string[];

    @OneToMany(
        () => SessionStream,
        (sessionStream) => sessionStream.timetable,
        { lazy: true }
    )
    sessionStreams: Lazy<SessionStream[]>;

    @RelationId((timetable: Timetable) => timetable.sessionStreams)
    sessionStreamIds: string[];

    @Field(() => FreezeState)
    @Column({ enum: FreezeState, default: FreezeState.FREE })
    permanentRequestLock: FreezeState;

    @Field(() => FreezeState)
    @Column({ enum: FreezeState, default: FreezeState.FREE })
    temporaryRequestLock: FreezeState;

    @Column({ type: "uuid", nullable: true })
    allocationToken: string | null;

    public async getCourse(): Promise<Course> {
        return await Utils.loaders.course.load(this.courseId);
    }

    public async getTerm(): Promise<Term> {
        return await Utils.loaders.term.load(this.termId);
    }

    public static async fromCourseTerm(
        course: Course,
        term: Term
    ): Promise<Timetable> {
        const timetableId = course.timetableIds.find((timetableId) =>
            term.timetableIds.includes(timetableId)
        )!;
        return Utils.loaders.timetable.load(timetableId);
    }
}
