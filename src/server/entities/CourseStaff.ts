import {
    Check,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    RelationId,
    Unique,
} from "typeorm";
import { Timetable } from "./Timetable";
import { User } from "./User";
import { Preference } from "./Preference";
import { Field, ObjectType } from "type-graphql";
import { Role } from "../types/user";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";

@ObjectType()
@Entity()
@Check(checkFieldValueInEnum(Role, "role"))
@Unique(["timetable", "user"])
export class CourseStaff extends CourseRelatedEntity {
    @Field(() => Boolean)
    @Column({
        type: Boolean,
    })
    isNew: boolean;

    @Field()
    @Column()
    userId: string;

    @RelationId((courseStaff: CourseStaff) => courseStaff.timetable)
    timetableId: string;

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

    public async getCourse(): Promise<Course> {
        const loaders = CourseStaff.loaders;
        const timetable = await loaders.timetable.load(this.timetableId);
        return await loaders.course.load(timetable.courseId);
    }
}
