import {
    Check,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    RelationId,
} from "typeorm";
import { SessionType } from "../types/session";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { CourseStaff } from "./CourseStaff";
import { Field, ObjectType } from "type-graphql";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";
import { UserRelatedEntity } from "./UserRelatedEntity";
import { User } from "./User";
import { Utils } from "../utils/Util";

@ObjectType()
@Entity()
// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "sessionType"))
export class Preference
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity, UserRelatedEntity
{
    @Field(() => SessionType, { nullable: true })
    @Column("varchar", { length: 15, nullable: true })
    sessionType: SessionType | undefined;

    @Field()
    @Column()
    maxContigHours: number;

    @Field()
    @Column()
    maxWeeklyHours: number;

    @OneToOne(() => CourseStaff, (courseStaff) => courseStaff.preference, {
        lazy: true,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    courseStaff: Lazy<CourseStaff>;

    @RelationId((preference: Preference) => preference.courseStaff)
    @Column()
    courseStaffId: string;

    public async getCourse(): Promise<Course> {
        const loader = Utils.loaders;
        const courseStaff = await loader.courseStaff.load(this.courseStaffId);
        return await courseStaff.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loader = Utils.loaders;
        const courseStaff = await loader.courseStaff.load(this.courseStaffId);
        return await courseStaff.getTerm();
    }

    public async getOwner(): Promise<User> {
        const loader = Utils.loaders;
        const courseStaff = await loader.courseStaff.load(this.courseStaffId);
        return await courseStaff.getOwner();
    }
}
