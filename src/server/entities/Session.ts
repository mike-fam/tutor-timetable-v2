import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    RelationId,
    Unique,
} from "typeorm";
import { SessionStream } from "./SessionStream";
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
import { Utils } from "../utils/Util";
import startOfISOWeek from "date-fns/startOfISOWeek";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import asyncFilter from "node-filter-async";
import isBefore from "date-fns/isBefore";
import differenceBy from "lodash/differenceBy";

@ObjectType()
@Entity()
@Unique(["sessionStream", "week"])
export class Session
    extends BaseEntity
    implements CourseRelatedEntity, TermRelatedEntity
{
    @ManyToOne(() => SessionStream, (sessionStream) => sessionStream.sessions, {
        lazy: true,
        onDelete: "CASCADE",
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

    @ManyToMany(() => User, (user) => user.allocatedSessions, { lazy: true })
    allocatedUsers: Lazy<User[]>;

    @RelationId((session: Session) => session.allocatedUsers)
    @JoinTable()
    allocatedUserIds: string[];

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

    public async allocate(...users: User[]): Promise<void> {
        const allocatedUsers = (await Utils.loaders.user.loadMany(
            this.allocatedUserIds
        )) as User[];
        this.allocatedUsers = [...allocatedUsers, ...users];
        await this.save();
    }

    public async deallocate(...users: User[]): Promise<void> {
        const allocatedUsers = await this.allocatedUsers;
        this.allocatedUsers = differenceBy(
            allocatedUsers,
            users,
            (user) => user.id
        );
        await this.save();
    }

    public async clearAllocation(): Promise<void> {
        this.allocatedUsers = [];
        await this.save();
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
