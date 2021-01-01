import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { SessionStream } from "./SessionStream";
import { SessionAllocation } from "./SessionAllocation";
import { StaffRequest } from "./StaffRequest";
import { Field, Int, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";

@ObjectType()
@Entity()
export class Session extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => SessionStream)
    @ManyToOne(() => SessionStream, (sessionStream) => sessionStream.sessions, {
        lazy: true,
    })
    sessionStream: SessionStream;

    @Field()
    @Column("varchar", { length: 15 })
    location: string;

    @Field(() => Int)
    @Column()
    week: number;

    @Field(() => [SessionAllocation])
    @OneToMany(
        () => SessionAllocation,
        (sessionAllocation) => sessionAllocation.session,
        { lazy: true }
    )
    sessionAllocations: Lazy<SessionAllocation[]>;

    @Field(() => [StaffRequest])
    @OneToMany(() => StaffRequest, (request) => request.session, { lazy: true })
    requests: Lazy<StaffRequest[]>;
}
