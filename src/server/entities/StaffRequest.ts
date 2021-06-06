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
import { Utils } from "../utils/Util";
import { SessionStream } from "./SessionStream";
import { OfferStatus } from "../types/offer";

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

    @ManyToOne(() => User, (user) => user.requests, { lazy: true })
    requester: Lazy<User>;

    @ManyToOne(() => User, { lazy: true, nullable: true })
    finaliser: Lazy<User>;

    @RelationId((request: StaffRequest) => request.finaliser)
    @Column({ nullable: true })
    finaliserId: string | null;

    @ManyToOne(() => Session, (session) => session.requests, { lazy: true })
    session: Lazy<Session>;

    @RelationId((request: StaffRequest) => request.session)
    @Column()
    sessionId: string;

    @ManyToMany(() => Session, (session) => session.preferredSwapRequests, {
        lazy: true,
        cascade: true,
    })
    @JoinTable()
    swapPreference: Lazy<Session[]>;

    @RelationId((request: StaffRequest) => request.swapPreference)
    swapPreferenceSessionIds: string[];

    @OneToMany(() => Offer, (offer) => offer.request, { lazy: true })
    offers: Lazy<Offer[]>;

    @RelationId((request: StaffRequest) => request.offers)
    offerIds: string[];

    public async getCourse(): Promise<Course> {
        const loaders = Utils.loaders;
        const session = await loaders.session.load(this.sessionId);
        return await session.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = Utils.loaders;
        const session = await loaders.session.load(this.sessionId);
        return await session.getTerm();
    }

    public async getOwner(): Promise<User> {
        const loaders = Utils.loaders;
        return await loaders.user.load(this.requesterId);
    }

    public hasEffectOn(session: Session): Promise<boolean>;
    public hasEffectOn(stream: SessionStream): Promise<boolean>;

    public async hasEffectOn(
        session: Session | SessionStream
    ): Promise<boolean> {
        const requestedSession = await Utils.loaders.session.load(
            this.sessionId
        );
        if (session instanceof SessionStream) {
            return (
                requestedSession.sessionStreamId === session.id &&
                this.type === RequestType.PERMANENT
            );
        } else {
            if (requestedSession.id === session.id) {
                return true;
            }
            if (this.type !== RequestType.PERMANENT) {
                return false;
            }
            const subsequentSessions = await requestedSession.subsequentSessions();
            const subsequentSessionIds = subsequentSessions.map(
                (session) => session.id
            );
            return subsequentSessionIds.includes(session.id);
        }
    }

    public async getAcceptedOffer(): Promise<Offer | null> {
        const offers = (await Utils.loaders.offer.loadMany(
            this.offerIds
        )) as Offer[];
        const acceptedOffer = offers.filter(
            (offer) => offer.status === OfferStatus.ACCEPTED
        );
        return acceptedOffer.length === 0 ? null : acceptedOffer[0];
    }
}
