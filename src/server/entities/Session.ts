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

@ObjectType()
@Entity()
export class Session extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => SessionStream)
    @ManyToOne(() => SessionStream, (sessionStream) => sessionStream.sessions, {
        eager: true,
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
        { cascade: ["insert"] }
    )
    sessionAllocations: SessionAllocation[];

    @Field(() => [StaffRequest])
    @OneToMany(() => StaffRequest, (request) => request.session)
    requests: StaffRequest[];
}
