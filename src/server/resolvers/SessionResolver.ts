import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { Offer, Session, SessionStream, StaffRequest, User } from "../entities";

import { MyContext } from "../types/context";

@Resolver(() => Session)
export class SessionResolver {
    @Query(() => [Session])
    async sessions(
        @Arg("termId") termId: string,
        @Arg("courseIds", () => [String]) courseIds: string[],
        @Arg("week", () => Int) week: number,
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        const timetable = await models.timetable.get(
            {
                where: courseIds.map((courseId) => ({
                    termId,
                    courseId,
                })),
            },
            req.user
        );
        return await models.session.getMany(
            {
                where: timetable.sessionStreamIds.map((sessionStreamId) => ({
                    sessionStreamId,
                    week,
                })),
            },
            req.user
        );
    }

    @Query(() => Session)
    async sessionById(
        @Arg("sessionId") sessionId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Session> {
        return await models.session.getById(sessionId, req.user);
    }

    @FieldResolver(() => SessionStream)
    async sessionStream(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream> {
        return await models.sessionStream.getById(
            root.sessionStreamId,
            req.user
        );
    }

    @FieldResolver(() => [User])
    async allocatedUsers(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<User[]> {
        return await models.user.getByIds(root.allocatedUserIds, req.user);
    }

    @FieldResolver(() => [StaffRequest])
    async requests(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest[]> {
        return await models.staffRequest.getByIds(root.requestIds, req.user);
    }

    @FieldResolver(() => [StaffRequest])
    async preferredSwapRequests(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest[]> {
        return await models.staffRequest.getByIds(
            root.preferredSwapRequestIds,
            req.user
        );
    }

    @FieldResolver(() => [Offer])
    async preferredSwapOffers(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer[]> {
        return await models.offer.getByIds(
            root.preferredSwapOfferIds,
            req.user
        );
    }

    @FieldResolver(() => [Offer])
    async acceptedOffers(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer[]> {
        return await models.offer.getByIds(root.acceptedOfferIds, req.user);
    }

    @FieldResolver(() => Date)
    async date(@Root() root: Session): Promise<Date> {
        return root.date();
    }
}
