import {
    BaseEntity,
    Check,
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
import { Role } from "../types/user";
import { checkFieldValueInEnum, Lazy } from "../utils/query";

@ObjectType()
@Entity()
@Check(checkFieldValueInEnum(Role, "role"))
@Unique(["timetableId", "userId"])
export class CourseStaff extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Boolean)
    @Column({
        type: Boolean,
    })
    isNew: boolean;

    @Field(() => Int)
    @Column()
    userId: number;

    @Column()
    timetableId: number;

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

    @Field(() => Preference, { nullable: true })
    @OneToOne(() => Preference, (preference) => preference.courseStaff, {
        lazy: true,
        nullable: true,
    })
    @JoinColumn()
    preference: Lazy<Preference> | undefined;
}
