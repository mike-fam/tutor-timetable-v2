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

@ObjectType()
@Entity()
@Unique(["course", "term"])
export class Timetable extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Course)
    @ManyToOne(() => Course, (course) => course.timetables, { eager: true })
    course: Course;

    @Field(() => Int)
    @Column({ nullable: true })
    courseId: number;

    @Field(() => Term)
    @ManyToOne(() => Term, (term) => term.timetables, { eager: true })
    term: Term;

    @Field(() => Int)
    @Column({ nullable: true })
    termId: number;

    @Field(() => [CourseStaff])
    @OneToMany(() => CourseStaff, (courseStaff) => courseStaff.timetable)
    courseStaffs: CourseStaff[];

    @Field(() => [SessionStream])
    @OneToMany(() => SessionStream, (sessionStream) => sessionStream.timetable)
    sessionStreams: SessionStream[];
}
