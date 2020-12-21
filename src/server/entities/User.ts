import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CourseStaff } from "./CourseStaff";
import { StreamAllocation } from "./StreamAllocation";
import { SessionAllocation } from "./SessionAllocation";
import { StaffRequest } from "./StaffRequest";

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
        eager: true,
    })
    courseStaffs: CourseStaff[];

    @Field(() => [StreamAllocation])
    @OneToMany(
        () => StreamAllocation,
        (streamAllocation) => streamAllocation.user
    )
    streamAllocations: StreamAllocation[];

    @Field(() => [SessionAllocation])
    @OneToMany(
        () => SessionAllocation,
        (sessionAllocation) => sessionAllocation.user
    )
    sessionAllocations: SessionAllocation[];

    @Field(() => [StaffRequest])
    @OneToMany(() => StaffRequest, (staffRequest) => staffRequest.requester)
    requests: StaffRequest[];

    @Field(() => [StaffRequest])
    @OneToMany(() => StaffRequest, (staffRequest) => staffRequest.acceptor)
    acceptedRequests: StaffRequest[];
}
