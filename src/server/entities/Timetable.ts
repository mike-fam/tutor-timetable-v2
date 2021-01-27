import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { Course } from "./Course";
import { Term } from "./Term";
import { CourseStaff } from "./CourseStaff";
import { SessionStream } from "./SessionStream";
import { Field, Int, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";

@ObjectType()
@Entity()
@Unique(["courseId", "termId"])
export class Timetable extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column({ nullable: true })
    courseId: number;

    @Field(() => Int)
    @Column({ nullable: true })
    termId: number;

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
}
