import { Column, Entity, OneToMany, OneToOne, RelationId } from "typeorm";
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
import { asyncMap } from "../../utils/array";
import { UserSettings } from "./UserSettings";
import { Session } from "./Session";
import { Utils } from "../utils/Util";
import { DataLoaderKey } from "../types/dataloaders";

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

    @RelationId((user: User) => user.sessionAllocations)
    sessionAllocationIds: string[];

    @Field(() => [StaffRequest])
    @OneToMany(() => StaffRequest, (staffRequest) => staffRequest.requester, {
        lazy: true,
    })
    requests: Lazy<StaffRequest[]>;

    @RelationId((user: User) => user.requests)
    requestIds: string[];

    @Field(() => [Timeslot])
    @OneToMany(() => Timeslot, (timeslot) => timeslot.user, { lazy: true })
    availabilities: Lazy<Timeslot[]>;

    @Field(() => [Offer])
    @OneToMany(() => Offer, (offer) => offer.user, { lazy: true })
    offers: Lazy<Offer[]>;

    @RelationId((user: User) => user.offers)
    offerIds: string[];

    @Field(() => UserSettings)
    @OneToOne(() => UserSettings, (settings) => settings.user, { lazy: true })
    settings: Lazy<User>;

    private getCourseStaff(term: Term): Promise<CourseStaff[]>;
    private getCourseStaff(term: Term, course: Course): Promise<CourseStaff[]>;

    private async getCourseStaff(
        term: Term,
        course?: Course
    ): Promise<CourseStaff[]> {
        const loaders = Utils.loaders;
        const courseStaffs = (await loaders.courseStaff.loadMany(
            this.courseStaffIds
        )) as CourseStaff[];
        return await asyncFilter(courseStaffs, async (courseStaff) => {
            const staffCourse = await courseStaff.getCourse();
            const staffTerm = await courseStaff.getTerm();
            return (
                staffTerm.id === term.id &&
                (!course || course.id === staffCourse.id)
            );
        });
    }

    public async isCoordinatorOf(course: Course, term: Term): Promise<boolean> {
        return (await this.getCourseStaff(term, course)).some(
            (courseStaff) => courseStaff.role === Role.COURSE_COORDINATOR
        );
    }

    public async isStaffOf(course: Course, term: Term): Promise<boolean> {
        return (await this.getCourseStaff(term, course)).length > 0;
    }

    public async coursesCoordinating(term: Term): Promise<Course[]> {
        const courseStaff = (await this.getCourseStaff(term)).filter(
            (courseStaff) => courseStaff.role === Role.COURSE_COORDINATOR
        );
        return await asyncMap(
            courseStaff,
            async (courseStaff) => await courseStaff.getCourse()
        );
    }

    public async coursesWorkingIn(term: Term): Promise<Course[]> {
        return await asyncMap(await this.getCourseStaff(term), (courseStaff) =>
            courseStaff.getCourse()
        );
    }

    public async allocatedSessions(
        course: Course,
        term: Term
    ): Promise<Session[]> {
        const sessionAllocations = (await Utils.loaders.sessionAllocation.loadMany(
            this.sessionAllocationIds
        )) as SessionAllocation[];
        const sessions = (await Utils.loaders.session.loadMany(
            sessionAllocations.map(
                (sessionAllocation) => sessionAllocation.sessionId
            )
        )) as Session[];
        return await asyncFilter(
            sessions,
            async (session) =>
                (await session.getTerm()).id === term.id &&
                (await session.getCourse()).id === course.id
        );
    }
}
