import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timetable } from "./Timetable";
import { User } from "./User";

@Entity()
export class CourseStaff extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Timetable, (timetable) => timetable.courseStaffs)
    timetable: Timetable;

    @ManyToOne(() => User, (user) => user.courseStaffs)
    user: User;
}
