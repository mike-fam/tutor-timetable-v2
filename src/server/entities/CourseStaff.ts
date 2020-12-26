import {
    BaseEntity,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    JoinColumn,
    Column,
    Check,
} from "typeorm";
import { Timetable } from "./Timetable";
import { User } from "./User";
import { Preference } from "./Preference";
import { Field, Int, ObjectType } from "type-graphql";
import { Role } from "../../types/user";
import { checkFieldValueInEnum } from "../utils/query";

@ObjectType()
@Entity()
@Check(checkFieldValueInEnum(Role, "role"))
@Unique(["timetable", "user"])
export class CourseStaff extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Role)
    @Column("varchar")
    role: Role;

    @Field(() => Timetable)
    @ManyToOne(() => Timetable, (timetable) => timetable.courseStaffs, {
        eager: true,
    })
    timetable: Timetable;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.courseStaffs)
    user: User;

    @Field()
    @Column()
    userUsername: string;

    @Field(() => Preference, { nullable: true })
    @OneToOne(() => Preference, (preference) => preference.courseStaff, {
        nullable: true,
    })
    @JoinColumn()
    preference: Preference;
}
