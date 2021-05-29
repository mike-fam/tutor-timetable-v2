import {
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
import { Lazy } from "../utils/query";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";

@ObjectType()
@Entity()
@Unique(["course", "term"])
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

    public async getCourse(): Promise<Course> {
        return await Timetable.loaders.course.load(this.courseId);
    }

    public async getTerm(): Promise<Term> {
        return await Timetable.loaders.term.load(this.termId);
    }
}
