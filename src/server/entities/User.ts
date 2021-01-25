import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CourseStaff } from "./CourseStaff";
import { StreamAllocation } from "./StreamAllocation";
import { SessionAllocation } from "./SessionAllocation";
import { StaffRequest } from "./StaffRequest";
import { Lazy } from "../utils/query";
import { Timeslot } from "./Timeslot";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryColumn({ length: 9 })
    username: string;

    @Field()
    @Column({ length: 64 })
    name: string;

    @Field()
    @Column({ length: 256 })
    email: string;

    @Field(() => [CourseStaff])
    @OneToMany(() => CourseStaff, (courseStaff) => courseStaff.user, {
        lazy: true,
    })
    courseStaffs: Lazy<CourseStaff[]>;

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
}
