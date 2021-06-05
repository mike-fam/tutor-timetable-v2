import { Field, ObjectType } from "type-graphql";
import {
    Check,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    RelationId,
} from "typeorm";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { Session } from "./Session";
import { StaffRequest } from "./StaffRequest";
import { User } from "./User";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";
import { OfferStatus } from "../types/offer";
import { UserRelatedEntity } from "./UserRelatedEntity";
import { Utils } from "../utils/Util";
import { SessionStream } from "./SessionStream";
import { RequestType } from "../types/request";

@ObjectType()
@Entity()
@Check(checkFieldValueInEnum(OfferStatus, "status"))
export class Offer
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity, UserRelatedEntity {
    @Field(() => StaffRequest)
    @ManyToOne(() => StaffRequest, (staffRequest) => staffRequest.offers, {
        lazy: true,
        onDelete: "CASCADE",
    })
    request: Lazy<StaffRequest>;

    @RelationId((offer: Offer) => offer.request)
    @Column()
    requestId: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.offers, { lazy: true })
    user: Lazy<User>;

    @RelationId((offer: Offer) => offer.user)
    @Column()
    userId: string;

    @Field(() => [Session])
    @ManyToMany(() => Session, (session) => session.offerPreferences, {
        lazy: true,
        cascade: true,
    })
    @JoinTable()
    preferences: Lazy<Session[]>;

    @RelationId((offer: Offer) => offer.preferences)
    preferenceSessionIds: string[];

    @Field(() => OfferStatus)
    @Column({ enum: OfferStatus, default: OfferStatus.OPEN })
    status: OfferStatus;

    @Field(() => [Session])
    @ManyToOne(() => Session, (session) => session.acceptedOffers, {
        lazy: true,
        nullable: true,
    })
    acceptedSession?: Lazy<Session>;

    @RelationId((offer: Offer) => offer.acceptedSession)
    @Column({ nullable: true })
    acceptedSessionId?: string;

    @Field()
    @Column({ default: false })
    mustSwap: boolean;

    @Column({ type: "timestamp with time zone", nullable: true })
    acceptedDate?: Date;

    public async getCourse(): Promise<Course> {
        const loaders = Utils.loaders;
        const request = await loaders.staffRequest.load(this.requestId);
        return await request.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = Utils.loaders;
        const request = await loaders.staffRequest.load(this.requestId);
        return await request.getTerm();
    }

    public async getOwner(): Promise<User> {
        const loaders = Utils.loaders;
        return await loaders.user.load(this.userId);
    }

    public hasEffectOn(session: Session): Promise<boolean>;
    public hasEffectOn(stream: SessionStream): Promise<boolean>;

    public async hasEffectOn(
        session: Session | SessionStream
    ): Promise<boolean> {
        if (!this.acceptedSessionId) {
            return false;
        }
        const request = await Utils.loaders.staffRequest.load(this.requestId);
        const offeredSession = await Utils.loaders.session.load(
            this.acceptedSessionId
        );
        if (session instanceof SessionStream) {
            return (
                offeredSession.sessionStreamId === session.id &&
                request.type === RequestType.PERMANENT
            );
        } else {
            if (offeredSession.id === session.id) {
                return true;
            }
            if (request.type !== RequestType.PERMANENT) {
                return false;
            }
            const subsequentSessions = await offeredSession.subsequentSessions();
            const subsequentSessionIds = subsequentSessions.map(
                (session) => session.id
            );
            return subsequentSessionIds.includes(session.id);
        }
    }
}
