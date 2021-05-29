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

    // TODO: Offer status
    @Field(() => OfferStatus)
    @Column({ enum: OfferStatus })
    status: OfferStatus;

    public async getCourse(): Promise<Course> {
        const loaders = Offer.loaders;
        const request = await loaders.staffRequest.load(this.requestId);
        return await request.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = Offer.loaders;
        const request = await loaders.staffRequest.load(this.requestId);
        return await request.getTerm();
    }

    public async getOwner(): Promise<User> {
        const loaders = Offer.loaders;
        return await loaders.user.load(this.userId);
    }
}
