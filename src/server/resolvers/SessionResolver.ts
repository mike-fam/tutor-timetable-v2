import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Offer, Session, SessionStream, StaffRequest, User } from "../entities";
import { Service } from "typedi";
import { EntityResolver } from "./EntityResolver";
import { MyContext } from "../types/context";

@Service()
@Resolver(() => Session)
export class SessionResolver extends EntityResolver {
    @Query(() => [Session])
    async sessions(
        @Arg("termId") termId: string,
        @Arg("courseIds", () => [String]) courseIds: string[],
        @Arg("week", () => Int) week: number
    ): Promise<Session[]> {
        if (courseIds.length === 0) {
            return [];
        }
        return await getConnection()
            .getRepository(Session)
            .createQueryBuilder("session")
            .innerJoinAndSelect("session.sessionStream", "sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where("timetable.termId = :termId", { termId })
            .andWhere("session.week = :week", { week })
            .andWhere("timetable.courseId IN (:...courseIds)", { courseIds })
            .getMany();
    }

    @Query(() => Session)
    async sessionById(@Arg("sessionId") sessionId: string): Promise<Session> {
        return await Session.findOneOrFail({ id: sessionId });
    }

    @FieldResolver(() => SessionStream)
    async sessionStream(
        @Root() root: Session,
        @Ctx() { req }: MyContext
    ): Promise<SessionStream> {
        return this.sessionStreamModel.getById(root.sessionStreamId, req.user);
    }

    @FieldResolver(() => [User])
    async allocatedUsers(
        @Root() root: Session,
        @Ctx() { req }: MyContext
    ): Promise<User[]> {
        const allocatedUsers = await root.getAllocatedUsers();
        return this.userModel.getByIds(
            allocatedUsers.map((user) => user.id),
            req.user
        );
    }

    @FieldResolver(() => [StaffRequest])
    async requests(
        @Root() root: Session,
        @Ctx() { req }: MyContext
    ): Promise<StaffRequest[]> {
        return this.staffRequestModel.getByIds(root.requestIds, req.user);
    }

    @FieldResolver(() => [StaffRequest])
    async preferredSwapRequests(
        @Root() root: Session,
        @Ctx() { req }: MyContext
    ): Promise<StaffRequest[]> {
        return this.staffRequestModel.getByIds(
            root.preferredSwapRequestIds,
            req.user
        );
    }

    @FieldResolver(() => [Offer])
    async preferredSwapOffers(
        @Root() root: Session,
        @Ctx() { req }: MyContext
    ): Promise<Offer[]> {
        return this.offerModel.getByIds(root.preferredSwapOfferIds, req.user);
    }

    @FieldResolver(() => [Offer])
    async acceptedOffers(
        @Root() root: Session,
        @Ctx() { req }: MyContext
    ): Promise<Offer[]> {
        return this.offerModel.getByIds(root.acceptedOfferIds, req.user);
    }
}
