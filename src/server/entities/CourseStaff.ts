import {
    BaseEntity,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    JoinColumn,
} from "typeorm";
import { Timetable } from "./Timetable";
import { User } from "./User";
import { Preference } from "./Preference";

@Entity()
@Unique(["timetable", "user"])
export class CourseStaff extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Timetable, (timetable) => timetable.courseStaffs)
    timetable: Timetable;

    @ManyToOne(() => User, (user) => user.courseStaffs)
    user: User;

    @OneToOne(() => Preference, (preference) => preference.courseStaff)
    @JoinColumn()
    preference: Preference;
}
