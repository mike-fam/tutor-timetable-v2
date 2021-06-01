import {
    Check,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    RelationId,
    Unique,
} from "typeorm";
import { User } from "./User";
import { Session } from "./Session";
import { Field, ObjectType } from "type-graphql";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { RequestStatus, RequestType } from "../types/request";
import { Offer } from "./Offer";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";
import { UserRelatedEntity } from "./UserRelatedEntity";

@ObjectType()
@Entity()
@Unique(["requester", "session"])
@Check(checkFieldValueInEnum(RequestType, "type"))
@Check(checkFieldValueInEnum(RequestStatus, "status"))
export class StaffRequest
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity, UserRelatedEntity {
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

    @Field()
    @Column({ default: false })
    allowNonPrefOffers: boolean;

    @RelationId((request: StaffRequest) => request.requester)
    @Column()
    requesterId: string;

    @RelationId((request: StaffRequest) => request.session)
    @Column()
    sessionId: string;

    @RelationId((request: StaffRequest) => request.acceptor)
    @Column()
    acceptorId: string;

    @ManyToOne(() => User, (user) => user.requests, { lazy: true })
    requester: Lazy<User>;

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

    @RelationId((request: StaffRequest) => request.swapPreference)
    swapPreferenceSessionIds: string[];

    @Field(() => [Offer])
    @OneToMany(() => Offer, (offer) => offer.request, { lazy: true })
    offers: Lazy<Offer[]>;

    @RelationId((request: StaffRequest) => request.offers)
    offerIds: string[];

    public async getCourse(): Promise<Course> {
        const loaders = StaffRequest.loaders;
        const session = await loaders.session.load(this.sessionId);
        return await session.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = StaffRequest.loaders;
        const session = await loaders.session.load(this.sessionId);
        return await session.getTerm();
    }

    public async getOwner(): Promise<User> {
        const loaders = StaffRequest.loaders;
        return await loaders.user.load(this.requesterId);
    }
}
