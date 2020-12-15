import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { CourseStaff } from "./CourseStaff";
import { StreamAllocation } from "./StreamAllocation";
import { SessionAllocation } from "./SessionAllocation";
import { StaffRequest } from "./Request";

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

    @OneToMany(() => CourseStaff, (courseStaff) => courseStaff.user)
    courseStaffs: CourseStaff[];

    @OneToMany(
        () => StreamAllocation,
        (streamAllocation) => streamAllocation.user
    )
    streamAllocations: StreamAllocation[];

    @OneToMany(
        () => SessionAllocation,
        (sessionAllocation) => sessionAllocation.user
    )
    sessionAllocations: SessionAllocation[];

    @OneToMany(() => StaffRequest, (staffRequest) => staffRequest.requester)
    requests: StaffRequest[];

    @OneToMany(() => StaffRequest, (staffRequest) => staffRequest.acceptor)
    acceptedRequests: StaffRequest[];
}
