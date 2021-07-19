import { Models } from "../types/models";
import { Session, User } from "../entities";
import differenceBy from "lodash/differenceBy";
import { asyncForEach } from "../../utils/array";
import intersectionBy from "lodash/intersectionBy";

export const updateSessionAllocation = async (
    models: Models,
    rootSession: Session,
    newAllocationIds: string[],
    user: User
): Promise<Session> => {
    const { session: sessionModel, sessionStream: streamModel } = models;
    const rootStream = await streamModel.getById(
        rootSession.sessionStreamId,
        user
    );
    if (rootStream.rootId) {
        throw new Error("Invalid session");
    }
    const secondaryStreams = await streamModel.getByIds(
        rootStream.secondaryStreamIds,
        user
    );
    const secondarySessions = await sessionModel.getMany(
        {
            where: secondaryStreams.map((stream) => ({
                sessionStreamId: stream.id,
                week: rootSession.week,
            })),
        },
        user
    );
    const relevantSessionIds = [
        rootSession.id,
        ...secondarySessions.map((session) => session.id),
    ];
    const existingUserIds = [
        ...rootSession.allocatedUserIds,
        ...secondarySessions.reduce<string[]>(
            (arr, session) => [...arr, ...session.allocatedUserIds],
            []
        ),
    ];
    const relevantSessions = await sessionModel.getByIds(
        relevantSessionIds,
        user
    );
    const existingUsers = await models.user.getByIds(existingUserIds, user);
    const newUsers = await models.user.getByIds(newAllocationIds, user);
    const removedUsers = differenceBy(
        existingUsers,
        newUsers,
        (user) => user.id
    );
    const addedUsers = differenceBy(newUsers, existingUsers, (user) => user.id);
    await asyncForEach(relevantSessions, async (session) => {
        const allocatedUsers = await models.user.getByIds(
            session.allocatedUserIds,
            user
        );
        await sessionModel.deallocateMultiple(
            session,
            intersectionBy(
                allocatedUsers,
                removedUsers,
                (allocatedUser) => allocatedUser.id
            ),
            user
        );
    });
    const updatedSessions = await sessionModel.getByIds(
        relevantSessionIds,
        user
    );
    await asyncForEach(updatedSessions, async (updatedSession) => {
        const stream = await streamModel.getById(
            updatedSession.sessionStreamId,
            user
        );
        const usersAddedToSession = addedUsers.splice(
            0,
            stream.numberOfStaff - updatedSession.allocatedUserIds.length
        );
        await sessionModel.allocateMultiple(
            updatedSession,
            usersAddedToSession,
            user
        );
    });
    await sessionModel.allocateMultiple(rootSession, addedUsers, user);
    const updatedSession = Session.create({
        id: rootSession.id,
        location: rootSession.location,
        week: rootSession.week,
    });
    updatedSession.sessionStreamId = rootSession.sessionStreamId;
    updatedSession.allocatedUserIds = newAllocationIds;
    updatedSession.preferredSwapRequestIds = [
        ...rootSession.preferredSwapRequestIds,
        ...secondarySessions.reduce<string[]>(
            (arr, session) => [...arr, ...session.preferredSwapRequestIds],
            []
        ),
    ];
    updatedSession.preferredSwapOfferIds = [
        ...rootSession.preferredSwapOfferIds,
        ...secondarySessions.reduce<string[]>(
            (arr, session) => [...arr, ...session.preferredSwapOfferIds],
            []
        ),
    ];
    updatedSession.acceptedOfferIds = [
        ...rootSession.acceptedOfferIds,
        ...secondarySessions.reduce<string[]>(
            (arr, session) => [...arr, ...session.acceptedOfferIds],
            []
        ),
    ];
    return updatedSession;
};