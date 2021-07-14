import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import keyBy from "lodash/keyBy";
import { Offer, Session, SessionStream, StaffRequest, User } from "../entities";
import { MyContext } from "../types/context";
import { asyncForEach, asyncMap } from "../../utils/array";
import { updateSessionAllocation } from "../../client/utils/session";
import { In } from "typeorm";

@InputType()
export class AllocateSessionUserInput {
    @Field()
    rootSessionId: string;

    @Field(() => [String])
    newAllocation: string[];
}

@InputType()
export class UpdateSessionInput {
    @Field()
    id: string;

    @Field()
    location: string;
}

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
        const rootStreams = streams.filter((stream) => stream.rootId === null);
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
            const streamIdsToCheck = [...rootStream.secondaryStreamIds];
            const visitedStreamIds: string[] = [];
            while (streamIdsToCheck.length !== 0) {
                const currentStreamId = streamIdsToCheck.pop()!;
                const currentStream = streamMap[currentStreamId];
                visitedStreamIds.push(currentStreamId);
                streamIdsToCheck.push(...currentStream.secondaryStreamIds);
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
            const newSession = Session.create({
                id: rootSession.id,
                sessionStreamId: rootSession.sessionStreamId,
                location: rootSession.location,
                week: rootSession.week,
            });
            newSession.requestIds = [
                ...rootSession.requestIds,
                ...relatedRequestIds,
            ];
            newSession.preferredSwapRequestIds = [
                ...rootSession.preferredSwapRequestIds,
                ...relatedPreferredSwapRequestIds,
            ];
            newSession.preferredSwapOfferIds = [
                ...rootSession.preferredSwapOfferIds,
                ...relatedPreferredSwapOfferIds,
            ];
            newSession.acceptedOfferIds = [
                ...rootSession.acceptedOfferIds,
                ...relatedAcceptedOfferIds,
            ];
            newSession.allocatedUserIds = [
                ...rootSession.allocatedUserIds,
                ...relatedAllocatedUserIds,
            ];
            results.push(newSession);
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

    @Mutation(() => [Session])
    async updateSessionAllocations(
        @Arg("newAllocation", () => [AllocateSessionUserInput])
        allocateUserInput: AllocateSessionUserInput[],
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        const { user } = req;
        const { session: sessionModel } = models;
        const returnValue: Session[] = [];
        await asyncForEach(allocateUserInput, async (sessionInput) => {
            const rootSession = await sessionModel.getById(
                sessionInput.rootSessionId,
                user
            );
            const updatedSessions = await updateSessionAllocation(
                models,
                rootSession,
                sessionInput.newAllocation,
                user
            );
            returnValue.push(updatedSessions);
        });
        return returnValue;
    }

    @Mutation(() => [Session])
    async updateSession(
        @Arg("updateSessionInput", () => [UpdateSessionInput])
        updatedSessions: UpdateSessionInput[],
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        const user = req.user;
        return await asyncMap(
            updatedSessions,
            async ({ id, ...sessionInput }) => {
                const { location } = sessionInput;
                return await models.session.update({ id }, { location }, user);
            }
        );
    }

    @Mutation(() => [String])
    async deleteSessions(
        @Arg("sessionIds", () => [String])
        sessionIds: string[],
        @Ctx() { req, models }: MyContext
    ): Promise<string[]> {
        const { user } = req;
        const sessionsToDelete: string[] = [];
        const rootSessions = await models.session.getByIds(sessionIds, user);
        await asyncForEach(rootSessions, async (rootSession) => {
            const rootStream = await models.sessionStream.getById(
                rootSession.sessionStreamId,
                user
            );
            const secondarySessions = await models.session.getMany(
                {
                    where: rootStream.secondaryStreamIds.map((streamId) => ({
                        sessionStreamId: streamId,
                        week: rootSession.week,
                    })),
                },
                user
            );
            sessionsToDelete.push(
                rootSession.id,
                ...secondarySessions.map((session) => session.id)
            );
        });
        await models.session.deleteMany(
            {
                where: {
                    id: In(sessionsToDelete),
                },
            },
            user
        );
        return sessionIds;
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
