import { Column, Entity, OneToMany, RelationId } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CourseStaff } from "./CourseStaff";
import { StreamAllocation } from "./StreamAllocation";
import { SessionAllocation } from "./SessionAllocation";
import { StaffRequest } from "./StaffRequest";
import { Lazy } from "../utils/query";
import { Timeslot } from "./Timeslot";
import { Offer } from "./Offer";
import { BaseEntity } from "./BaseEntity";
import { Course } from "./Course";
import { Term } from "./Term";
import asyncFilter from "node-filter-async";
import { Role } from "../types/user";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @Column({ length: 9, unique: true })
    username: string;

    @Field()
    @Column({ length: 64 })
    name: string;

    @Field()
    @Column({ default: false })
    isAdmin: boolean;

    @Field()
    @Column({ length: 256 })
    email: string;

    @Field(() => [CourseStaff])
    @OneToMany(() => CourseStaff, (courseStaff) => courseStaff.user, {
        lazy: true,
    })
    courseStaffs: Lazy<CourseStaff[]>;

    @RelationId((user: User) => user.courseStaffs)
    courseStaffIds: string[];

    @Field(() => [StreamAllocation])
    @OneToMany(
        () => StreamAllocation,
        (streamAllocation) => streamAllocation.user,
        { lazy: true }
    )
    streamAllocations: Lazy<StreamAllocation[]>;

    @Field(() => [SessionAllocation])
    @OneToMany(
        () => SessionAllocation,
        (sessionAllocation) => sessionAllocation.user,
        { lazy: true }
    )
    sessionAllocations: Lazy<SessionAllocation[]>;

    @Field(() => [StaffRequest])
    @OneToMany(() => StaffRequest, (staffRequest) => staffRequest.requester, {
        lazy: true,
    })
    requests: Lazy<StaffRequest[]>;

    @Field(() => [StaffRequest])
    @OneToMany(() => StaffRequest, (staffRequest) => staffRequest.acceptor, {
        lazy: true,
    })
    acceptedRequests: Lazy<StaffRequest[]>;

    @Field(() => [Timeslot])
    @OneToMany(() => Timeslot, (timeslot) => timeslot.user, { lazy: true })
    availabilities: Lazy<Timeslot[]>;

    @Field(() => [Offer])
    @OneToMany(() => Offer, (offer) => offer.user, { lazy: true })
    offers: Lazy<Offer[]>;

    private async getCourseStaff(
        course: Course,
        term: Term
    ): Promise<CourseStaff[]> {
        const loaders = User.loaders;
        const courseStaffs = await loaders.courseStaff.loadMany(
            this.courseStaffIds
        );
        return (await asyncFilter(courseStaffs, async (courseStaff) => {
            if (courseStaff instanceof Error) {
                return false;
            }
            const timetable = await loaders.timetable.load(
                courseStaff.timetableId
            );
            return (
                timetable.courseId === course.id && timetable.termId === term.id
            );
        })) as CourseStaff[];
    }

    public async isCoordinatorOf(course: Course, term: Term): Promise<boolean> {
        return (await this.getCourseStaff(course, term)).some(
            (courseStaff) => courseStaff.role === Role.COURSE_COORDINATOR
        );
    }

    public async isStaffOf(course: Course, term: Term): Promise<boolean> {
        return (await this.getCourseStaff(course, term)).length > 0;
    }
}
