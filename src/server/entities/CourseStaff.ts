import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { Timetable } from "./Timetable";
import { User } from "./User";
import { Preference } from "./Preference";
import { Field, Int, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";
import { Role } from "../../types/user";

@ObjectType()
@Entity()
@Unique(["timetable", "user"])
export class CourseStaff extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Timetable)
    @ManyToOne(() => Timetable, (timetable) => timetable.courseStaffs, {
        lazy: true,
    })
    timetable: Lazy<Timetable>;

    @Field(() => Role)
    @Column()
    role: Role;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.courseStaffs, { lazy: true })
    user: Lazy<User>;

    @Field(() => Preference)
    @OneToOne(() => Preference, (preference) => preference.courseStaff, {
        lazy: true,
    })
    @JoinColumn()
    preference: Lazy<Preference>;
}
