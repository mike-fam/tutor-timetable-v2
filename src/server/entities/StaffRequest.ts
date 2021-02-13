import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { User } from "./User";
import { Session } from "./Session";
import { Field, Int, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";
import { RequestStatus, RequestType } from "../types/request";
import { Offer } from "./Offer";

@ObjectType()
@Entity()
@Unique(["requester", "session"])
export class StaffRequest extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => RequestType)
    @Column("varchar")
    type: RequestType;

    @Field()
    @Column("varchar")
    title: string;

    @Field()
    @Column("varchar")
    description: string;

    @Field(() => RequestStatus)
    @Column("varchar")
    status: RequestStatus;

    @Column()
    sessionId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.requests, { lazy: true })
    requester: Lazy<User>;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.acceptedRequests, { lazy: true })
    acceptor: Lazy<User>;

    @Field(() => User)
    @ManyToOne(() => User, { lazy: true, nullable: true })
    finaliser: Lazy<User>;

    @Field(() => Session)
    @ManyToOne(() => Session, (session) => session.requests, { lazy: true })
    session: Lazy<Session>;

    @Field(() => [Session])
    @ManyToMany(() => Session, (session) => session.preferredSwaps, {
        lazy: true,
        cascade: true,
    })
    @JoinTable()
    swapPreference: Lazy<Session[]>;

    @Field(() => [Offer])
    @OneToMany(() => Offer, (offer) => offer.request, { lazy: true })
    offers: Lazy<Offer[]>;
}
