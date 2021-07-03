import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import keyBy from "lodash/keyBy";
import { Offer, Session, SessionStream, StaffRequest, User } from "../entities";
import { MyContext } from "../types/context";

@Resolver(() => Session)
export class SessionResolver {
    @Query(() => [Session])
    async mergedSessions(
        @Arg("termId") termId: string,
        @Arg("courseIds", () => [String]) courseIds: string[],
        @Arg("week", () => Int) week: number,
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        const results = [];
        const user = req.user;
        const timetables = await models.timetable.getMany(
            {
                where: courseIds.map((courseId) => ({
                    termId,
                    courseId,
                })),
            },
            user
        );
        const streams = await models.sessionStream.getMany(
            {
                where: timetables.map((timetable) => ({
                    timetableId: timetable.id,
                })),
            },
            user
        );
        // get all root streams
        const rootStreams = streams.filter((stream) => stream.basedId === null);
        const streamMap = keyBy(streams, (stream) => stream.id);
        // get all root sessions of specified weeks
        const sessions = await models.session.getMany(
            {
                where: streams.map((stream) => ({
                    sessionStreamId: stream.id,
                    week,
                })),
            },
            user
        );
        const rootSessions = sessions.filter((session) =>
            rootStreams
                .map((stream) => stream.id)
                .includes(session.sessionStreamId)
        );
        // get related sessions (same week, same stream based id)
        for (const rootSession of rootSessions) {
            const rootStream = streamMap[rootSession.sessionStreamId];
            const streamIdsToCheck = [...rootStream.basedStreamIds];
            const visitedStreamIds: string[] = [];
            while (streamIdsToCheck.length !== 0) {
                const currentStreamId = streamIdsToCheck.pop()!;
                const currentStream = streamMap[currentStreamId];
                visitedStreamIds.push(currentStreamId);
                streamIdsToCheck.push(...currentStream.basedStreamIds);
            }
            const relatedSessions = sessions.filter((session) =>
                visitedStreamIds.includes(session.sessionStreamId)
            );
            const relatedAllocatedUserIds = relatedSessions.reduce<string[]>(
                (allocatedUserIds, session) => [
                    ...allocatedUserIds,
                    ...session.allocatedUserIds,
                ],
                []
            );
            const relatedRequestIds = relatedSessions.reduce<string[]>(
                (requestIds, session) => [...requestIds, ...session.requestIds],
                []
            );
            const relatedPreferredSwapRequestIds = relatedSessions.reduce<
                string[]
            >(
                (preferredSwapRequestIds, session) => [
                    ...preferredSwapRequestIds,
                    ...session.preferredSwapRequestIds,
                ],
                []
            );
            const relatedPreferredSwapOfferIds = relatedSessions.reduce<
                string[]
            >(
                (preferredSwapOfferIds, session) => [
                    ...preferredSwapOfferIds,
                    ...session.preferredSwapOfferIds,
                ],
                []
            );
            const relatedAcceptedOfferIds = relatedSessions.reduce<string[]>(
                (preferredSwapOfferIds, session) => [
                    ...preferredSwapOfferIds,
                    ...session.preferredSwapOfferIds,
                ],
                []
            );
            // add new merged session to results
            results.push(
                Session.create({
                    sessionStreamId: rootSession.sessionStreamId,
                    location: rootSession.location,
                    week: rootSession.week,
                    requestIds: [
                        ...rootSession.requestIds,
                        ...relatedRequestIds,
                    ],
                    preferredSwapRequestIds: [
                        ...rootSession.preferredSwapRequestIds,
                        ...relatedPreferredSwapRequestIds,
                    ],
                    preferredSwapOfferIds: [
                        ...rootSession.preferredSwapOfferIds,
                        ...relatedPreferredSwapOfferIds,
                    ],
                    acceptedOfferIds: [
                        ...rootSession.acceptedOfferIds,
                        ...relatedAcceptedOfferIds,
                    ],
                    allocatedUserIds: [
                        ...rootSession.allocatedUserIds,
                        ...relatedAllocatedUserIds,
                    ],
                })
            );
        }
        return results;
    }

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
