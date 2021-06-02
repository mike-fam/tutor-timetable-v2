import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    RelationId,
    Unique,
} from "typeorm";
import { SessionStream } from "./SessionStream";
import { SessionAllocation } from "./SessionAllocation";
import { StaffRequest } from "./StaffRequest";
import { Field, Int, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";
import { Offer } from "./Offer";
import { CourseRelatedEntity } from "./CourseRelatedEntity";
import { Course } from "./Course";
import { BaseEntity } from "./BaseEntity";
import { TermRelatedEntity } from "./TermRelatedEntity";
import { Term } from "./Term";
import { User } from "./User";
import { asyncMap } from "../../utils/array";

@ObjectType()
@Entity()
@Unique(["sessionStream", "week"])
export class Session
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity {
    @Field(() => SessionStream)
    @ManyToOne(() => SessionStream, (sessionStream) => sessionStream.sessions, {
        lazy: true,
    })
    sessionStream: SessionStream;

    @RelationId((session: Session) => session.sessionStream)
    @Column()
    sessionStreamId: string;

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
        { lazy: true, cascade: ["insert"] }
    )
    sessionAllocations: Lazy<SessionAllocation[]>;

    @RelationId((session: Session) => session.sessionAllocations)
    allocationIds: string;

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

    public async getCourse(): Promise<Course> {
        const loaders = Session.loaders;
        const stream = await loaders.sessionStream.load(this.sessionStreamId);
        return await stream.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = Session.loaders;
        const stream = await loaders.sessionStream.load(this.sessionStreamId);
        return await stream.getTerm();
    }

    public async getAllocatedUsers(): Promise<User[]> {
        const loaders = Session.loaders;
        const allocations = (await loaders.sessionAllocation.loadMany(
            this.allocationIds
        )) as SessionAllocation[];
        const users = await asyncMap(allocations, (allocation) =>
            loaders.user.load(allocation.userId)
        );
        return users;
    }
}
