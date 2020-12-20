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
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
@Unique(["timetable", "user"])
export class CourseStaff extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Timetable)
    @ManyToOne(() => Timetable, (timetable) => timetable.courseStaffs)
    timetable: Timetable;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.courseStaffs)
    user: User;

    @Field(() => Preference)
    @OneToOne(() => Preference, (preference) => preference.courseStaff)
    @JoinColumn()
    preference: Preference;
}
