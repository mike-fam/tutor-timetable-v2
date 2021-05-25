import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { SessionStream } from "./SessionStream";
import { SessionAllocation } from "./SessionAllocation";
import { StaffRequest } from "./StaffRequest";
import { Field, FieldResolver, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";
import { Offer } from "./Offer";

@ObjectType()
@Entity()
@Unique(["sessionStreamId", "week"])
export class Session extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => SessionStream)
    @ManyToOne(() => SessionStream, (sessionStream) => sessionStream.sessions, {
        lazy: true,
    })
    sessionStream: SessionStream;

    @Column()
    sessionStreamId: string;

    @Field()
    @Column("varchar", { length: 15 })
    location: string;

    @Field()
    @Column()
    week: number;

    @Field(() => [SessionAllocation])
    @OneToMany(
        () => SessionAllocation,
        (sessionAllocation) => sessionAllocation.session,
        { lazy: true, cascade: ["insert"] }
    )
    sessionAllocations: Lazy<SessionAllocation[]>;

    @Field(() => [StaffRequest])
    @OneToMany(() => StaffRequest, (request) => request.session, { lazy: true })
    requests: Lazy<StaffRequest[]>;

    @Field(() => [StaffRequest])
    @ManyToMany(() => StaffRequest, (request) => request.swapPreference, {
        lazy: true,
    })
    preferredSwaps: Lazy<StaffRequest[]>;

    @Field(() => [Offer])
    @ManyToMany(() => Offer, (offer) => offer.preferences, { lazy: true })
    offerPreferences: Lazy<Offer[]>;
}
