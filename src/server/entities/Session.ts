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
import { Utils } from "../utils/Util";
import startOfISOWeek from "date-fns/startOfISOWeek";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import asyncFilter from "node-filter-async";
import isBefore from "date-fns/isBefore";

@ObjectType()
@Entity()
@Unique(["sessionStream", "week"])
export class Session
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity {
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

    @OneToMany(
        () => SessionAllocation,
        (sessionAllocation) => sessionAllocation.session,
        { lazy: true, cascade: ["insert"] }
    )
    sessionAllocations: Lazy<SessionAllocation[]>;

    @RelationId((session: Session) => session.sessionAllocations)
    allocationIds: string;

    @OneToMany(() => StaffRequest, (request) => request.session, { lazy: true })
    requests: Lazy<StaffRequest[]>;

    @RelationId((session: Session) => session.requests)
    requestIds: string[];

    @ManyToMany(() => StaffRequest, (request) => request.swapPreference, {
        lazy: true,
    })
    preferredSwapRequests: Lazy<StaffRequest[]>;

    @RelationId((session: Session) => session.preferredSwapRequests)
    preferredSwapRequestIds: string[];

    @ManyToMany(() => Offer, (offer) => offer.preferences, { lazy: true })
    preferredSwapOffers: Lazy<Offer[]>;

    @RelationId((session: Session) => session.preferredSwapOffers)
    preferredSwapOfferIds: string[];

    @OneToMany(() => Offer, (offer) => offer.acceptedSession, { lazy: true })
    acceptedOffers: Lazy<Offer[]>;

    @RelationId((session: Session) => session.acceptedOffers)
    acceptedOfferIds: string[];

    public async getCourse(): Promise<Course> {
        const loaders = Utils.loaders;
        const stream = await loaders.sessionStream.load(this.sessionStreamId);
        return await stream.getCourse();
    }

    public async getTerm(): Promise<Term> {
        const loaders = Utils.loaders;
        const stream = await loaders.sessionStream.load(this.sessionStreamId);
        return await stream.getTerm();
    }

    public async getAllocatedUsers(): Promise<User[]> {
        const loaders = Utils.loaders;
        const allocations = (await loaders.sessionAllocation.loadMany(
            this.allocationIds
        )) as SessionAllocation[];
        const users = await asyncMap(allocations, (allocation) =>
            loaders.user.load(allocation.userId)
        );
        return users;
    }

    public async allocate(user: User): Promise<void> {
        const allocation = SessionAllocation.create({
            session: this,
            user,
        });
        await allocation.save();
    }

    public async deallocate(user: User): Promise<void> {
        const allocation = await SessionAllocation.findOne({
            session: this,
            user,
        });
        if (!allocation) {
            return;
        }
        await allocation.remove();
    }

    public async date(): Promise<Date> {
        const term = await this.getTerm();
        const stream = await Utils.loaders.sessionStream.load(
            this.sessionStreamId
        );
        const startOfTerm = startOfISOWeek(term.startDate);
        const sessionDate = addWeeks(
            addDays(startOfTerm, stream.day - 1),
            this.week
        );
        const hours = Math.floor(stream.startTime);
        const minutes = Math.round((stream.startTime % 1) * 60);
        return setMinutes(setHours(sessionDate, hours), minutes);
    }

    public async subsequentSessions(): Promise<Session[]> {
        const stream = await Utils.loaders.sessionStream.load(
            this.sessionStreamId
        );
        const sessionsInStream = (await Utils.loaders.session.loadMany(
            stream.sessionIds
        )) as Session[];
        return await asyncFilter(sessionsInStream, async (session) =>
            isBefore(await this.date(), await session.date())
        );
    }
}
