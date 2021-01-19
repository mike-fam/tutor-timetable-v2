import {
    BaseEntity,
    Check,
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { SessionType } from "../../types/session";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { CourseStaff } from "./CourseStaff";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "sessionType"))
export class Preference extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => SessionType, { nullable: true })
    @Column("varchar", { length: 15, nullable: true })
    sessionType: SessionType | undefined;

    @Field()
    @Column()
    maxContigHours: number;

    @Field()
    @Column()
    maxWeeklyHours: number;

    @Field(() => CourseStaff)
    @OneToOne(() => CourseStaff, (courseStaff) => courseStaff.preference, {
        lazy: true,
    })
    courseStaff: Lazy<CourseStaff>;
}
