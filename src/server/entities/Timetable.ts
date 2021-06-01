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
import { StaffRequest } from "./StaffRequest";
import { RequestType } from "../types/request";

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
        return await Timetable.loaders.course.load(this.courseId);
    }

    public async getTerm(): Promise<Term> {
        return await Timetable.loaders.term.load(this.termId);
    }

    public static async fromCourseTerm(
        course: Course,
        term: Term
    ): Promise<Timetable> {
        const timetableId = course.timetableIds.find((timetableId) =>
            term.timetableIds.includes(timetableId)
        )!;
        return Timetable.loaders.timetable.load(timetableId);
    }

    public canAcceptRequest(request: StaffRequest): boolean {
        if (request.type === RequestType.PERMANENT) {
            return this.permanentRequestLock === FreezeState.FREE;
        } else if (request.type === RequestType.TEMPORARY) {
            return this.temporaryRequestLock === FreezeState.FREE;
        }
        return false; // Needed for compiler
    }

    public canMakeNewOffer(request: StaffRequest): boolean {
        if (request.type === RequestType.PERMANENT) {
            return this.permanentRequestLock !== FreezeState.LOCK;
        } else if (request.type === RequestType.TEMPORARY) {
            return this.temporaryRequestLock !== FreezeState.LOCK;
        }
        return false; // Needed for compiler
    }
}
