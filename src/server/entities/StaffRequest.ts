import {
    Check,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    RelationId,
    Unique
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

@ObjectType()
@Entity()
@Unique(["requester", "session"])
@Check(checkFieldValueInEnum(RequestType, "type"))
@Check(checkFieldValueInEnum(RequestStatus, "status"))
export class StaffRequest
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity {
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

    @RelationId((request: StaffRequest) => request.requester)
    requesterId: string;

    @RelationId((request: StaffRequest) => request.session)
    sessionId: string;

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
}
