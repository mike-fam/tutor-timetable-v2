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
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";
import { UserRelatedEntity } from "./UserRelatedEntity";

@ObjectType()
@Entity()
@Check(checkFieldValueInEnum(Role, "role"))
@Unique(["timetable", "user"])
export class CourseStaff
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity, UserRelatedEntity {
    @Field(() => Boolean)
    @Column({
        type: Boolean,
    })
    isNew: boolean;

    @RelationId((courseStaff: CourseStaff) => courseStaff.user)
    @Column()
    userId: string;

    @RelationId((courseStaff: CourseStaff) => courseStaff.timetable)
    @Column()
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

    @RelationId((courseStaff: CourseStaff) => courseStaff.preference)
    @Column()
    preferenceId: string;

    public async getCourse(): Promise<Course> {
        const loaders = CourseStaff.loaders;
        const timetable = await loaders.timetable.load(this.timetableId);
        return await loaders.course.load(timetable.courseId);
    }

    public async getTerm(): Promise<Term> {
        const loaders = CourseStaff.loaders;
        const timetable = await loaders.timetable.load(this.timetableId);
        return await loaders.term.load(timetable.termId);
    }

    public async getOwner(): Promise<User> {
        const loaders = CourseStaff.loaders;
        return await loaders.user.load(this.userId);
    }
}
