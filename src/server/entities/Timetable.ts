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

    @Field(() => Course)
    @ManyToOne(() => Course, (course) => course.timetables, { lazy: true })
    course: Lazy<Course>;

    @Field(() => Term)
    @ManyToOne(() => Term, (term) => term.timetables, { lazy: true })
    term: Lazy<Term>;

    @Field(() => [CourseStaff])
    @OneToMany(() => CourseStaff, (courseStaff) => courseStaff.timetable, {
        lazy: true,
    })
    courseStaffs: Lazy<CourseStaff[]>;

    @Field(() => [SessionStream])
    @OneToMany(
        () => SessionStream,
        (sessionStream) => sessionStream.timetable,
        { lazy: true }
    )
    sessionStreams: Lazy<SessionStream[]>;

    @Field(() => FreezeState)
    @Column({ enum: FreezeState, default: FreezeState.FREE })
    permanentRequestLock: FreezeState;

    @Field(() => FreezeState)
    @Column({ enum: FreezeState, default: FreezeState.FREE })
    temporaryRequestLock: FreezeState;

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
