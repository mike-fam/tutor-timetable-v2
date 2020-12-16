import {
    BaseEntity,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { Term } from "./Term";
import { CourseStaff } from "./CourseStaff";
import { SessionStream } from "./SessionStream";

@Entity()
export class Timetable extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, (course) => course.timetables)
    course: Course;

    @ManyToOne(() => Term, (term) => term.timetables)
    term: Term;

    @OneToMany(() => CourseStaff, (courseStaff) => courseStaff.timetable)
    courseStaffs: CourseStaff[];

    @OneToMany(() => SessionStream, (sessionStream) => sessionStream.timetable)
    sessionStreams: SessionStream[];
}
