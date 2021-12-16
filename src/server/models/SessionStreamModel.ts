import { BaseModel } from "./BaseModel";
import {
    Offer,
    SessionStream,
    StaffRequest,
    Timetable,
    User,
} from "../entities";
import { PermissionState } from "../types/permission";
import { OfferStatus } from "../types/offer";
import { PERM_ERR } from "../constants";
import { DataLoaders } from "../types/dataloaders";
import { asyncFilter } from "../../utils/array";

export class SessionStreamModel extends BaseModel<SessionStream> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = SessionStream;
        this.loader = loaders.sessionStream;
    }

    /**
     * A user can read a preference entry if EITHER of these holds
     *
     * they are admin
     * OR
     * they are a staff member of the course the stream belongs to
     *
     * @param {SessionStream} stream stream to be read
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(
        stream: SessionStream,
        user: User
    ): Promise<PermissionState> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        if (!(await user.isStaffOf(course, term))) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can update a session stream if EITHER of these conditions holds
     *
     * They are admin
     * OR
     * They are the course coordinator of the session stream
     *
     * If they are the course coordinator, ALL of the following conditions apply
     *      If the session stream is based on another stream, they cannot
     *          modify the startTime, endTime, day and type of that stream
     *          WITHOUT setting based to null first
     *      They cannot change the timetable of the stream
     *
     * @param {SessionStream} stream stream to be updated
     * @param {Partial} updatedFields fields to be updated
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canUpdate(
        stream: SessionStream,
        updatedFields: Partial<SessionStream>,
        user: User
    ): Promise<PermissionState> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return { hasPerm: false };
        }
        if (
            updatedFields.timetableId &&
            updatedFields.timetableId !== stream.timetableId
        ) {
            return { hasPerm: false };
        }
        if (updatedFields.timetable) {
            const timetable = (await updatedFields.timetable) as Timetable;
            if (timetable.id !== stream.timetableId) {
                return { hasPerm: false };
            }
        }
        if (stream.rootId) {
            if (updatedFields.rootId === null) {
                return { hasPerm: true };
            }
            if (
                updatedFields.startTime &&
                updatedFields.startTime !== stream.startTime
            ) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the start time of a based stream",
                };
            }
            if (
                updatedFields.endTime &&
                updatedFields.endTime !== stream.endTime
            ) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the end time of a based stream",
                };
            }
            if (updatedFields.type && updatedFields.type !== stream.type) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the type of a based stream",
                };
            }
            if (updatedFields.day && updatedFields.day !== stream.day) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the day of a based stream",
                };
            }
        }
        return { hasPerm: true };
    }

    /**
     * A user can delete a stream if EITHER
     * they are admin
     * OR
     * they are course coordinator of the course and term of that stream
     *
     * @param {SessionStream} stream stream to be deleted
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canDelete(
        stream: SessionStream,
        user: User
    ): Promise<PermissionState> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        return {
            hasPerm: await user.isCoordinatorOf(course, term),
        };
    }

    /**
     * A user can create a session stream if EITHER
     * they are admin
     * OR
     * they are course coordinator of the course and term of that stream AND
     * IF the stream is based
     *
     * @param {SessionStream} stream stream to be created
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canCreate(
        stream: SessionStream,
        user: User
    ): Promise<PermissionState> {
        let timetable: Timetable;
        if (stream.timetableId) {
            timetable = await this.loaders.timetable.load(stream.timetableId);
        } else {
            timetable = await stream.timetable;
        }
        const course = await timetable.getCourse();
        const term = await timetable.getTerm();
        return { hasPerm: await user.isCoordinatorOf(course, term) };
    }

    /**
     * A user can allocate multiple staff members to a session if EITHER
     *
     * They are admin
     * OR
     * They are course coordinator of the session, AND ALL of the following hold
     *      The staff member has to work in the same course in the same term
     *      The staff member is not already on that session
     *
     * @param {SessionStream} stream stream to allocate users to
     * @param {User[]} staff users to allocate to stream
     * @param {User} user user performing this action
     * @protected
     */
    public async allocateMultiple(
        stream: SessionStream,
        staff: User[] | string[],
        user: User
    ): Promise<void> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        const allocatedUsers = (await this.loaders.user.loadMany(
            stream.allocatedUserIds
        )) as User[];
        const allocatedUserIds = allocatedUsers.map((user) => user.id);
        let staffUsers: User[];
        if (typeof staff[0] === "string") {
            staffUsers = (await this.loaders.user.loadMany(
                staff as string[]
            )) as User[];
        } else {
            staffUsers = staff as User[];
        }
        // Disallow if staff is already allocated to this session
        for (const staffMember of staffUsers) {
            if (allocatedUserIds.includes(staffMember.id)) {
                throw new Error(
                    `User ${staffMember.name} already works in that session.`
                );
            }
        }
        // If is admin
        if (user.isAdmin) {
            await stream.allocate(...staffUsers);
            return;
        }
        // If not course coordinator
        if (!(await user.isCoordinatorOf(course, term))) {
            throw new Error(PERM_ERR);
        }
        // Disallow if staff is not of same course and same term
        for (const staffMember of staffUsers) {
            if (!(await staffMember.isStaffOf(course, term))) {
                throw new Error(
                    `User ${staffMember.name} does not work in ` +
                        `${course.code} in ${term.type}, ${term.year}.`
                );
            }
        }
        await stream.allocate(...staffUsers);
    }

    /**
     * A user can allocate a single staff member to a stream if EITHER
     * they are admin
     * OR
     * They are a staff member of this session, AND ALL of the following hold
     *      There is a PERMANENT request that points to a session of this
     *          stream
     *      They are the requester
     *      There is an offer of the request that has a status of ACCEPTED
     *      That offer has to be the offer that's accepted most recently
     *      The allocated staff is the offer maker
     * OR
     * They are a staff member of this session, AND ALL of the following hold
     *      There is an accepted offer with the acceptedSession field pointing
     *          to a session of this stream
     *      The request of that offer is of type PERMANENT
     *      The request of that offer is made by user
     *      That offer is the most recently accepted offer that points to
     *          that session
     *      The staff member allocated to session must be the user
     *
     * @param {SessionStream} stream stream to allocate user to
     * @param {User} staff user to be allocated to stream
     * @param {User} user user performing this action
     * @protected
     */
    public async allocateSingleFromOffer(
        stream: SessionStream,
        staff: User,
        user: User
    ): Promise<void> {
        const loaders = this.loaders;
        const allocatedUsers = (await this.loaders.user.loadMany(
            stream.allocatedUserIds
        )) as User[];
        const allocatedUserIds = allocatedUsers.map((user) => user.id);
        if (!allocatedUserIds.includes(staff.id)) {
            throw new Error(`User ${staff.name} does not work on that session`);
        }
        // Get requests of this user
        const userRequests = (await loaders.staffRequest.loadMany(
            user.requestIds
        )) as StaffRequest[];
        if (allocatedUserIds.includes(user.id)) {
            // Get requests that points to this session
            const affectingRequests = await asyncFilter(
                userRequests,
                async (request) => await request.hasEffectOn(stream)
            );
            // Get all offers of all requests
            const offerIdsOfRequests = affectingRequests.reduce<string[]>(
                (offerIds, request) => [...offerIds, ...request.offerIds],
                []
            );
            const offersOfRequests = (await loaders.offer.loadMany(
                offerIdsOfRequests
            )) as Offer[];
            // Get all accepted offers in most to least recently accepted order
            const acceptedOffers = offersOfRequests
                .filter((offer) => offer.status === OfferStatus.ACCEPTED)
                .sort(
                    (offer1, offer2) =>
                        offer2.acceptedDate!.getTime() -
                        offer1.acceptedDate!.getTime()
                );
            if (acceptedOffers.length === 0) {
                throw new Error("Cannot find any accepted offer of request");
            }
            const offer = acceptedOffers[0];
            // If most recently accepted offer is not made by staff, error
            if (offer.userId !== staff.id) {
                throw new Error(
                    `You did not accept any offer of '${staff.name}'`
                );
            }
            await stream.allocate(staff);
        } else {
            // Handle second case specified above
            // Get all offers of all requests
            if (user.id !== staff.id) {
                throw new Error(PERM_ERR);
            }
            const offerIdsOfRequests = userRequests.reduce<string[]>(
                (offerIds, request) => [...offerIds, ...request.offerIds],
                []
            );
            const offersOfRequests = (await loaders.offer.loadMany(
                offerIdsOfRequests
            )) as Offer[];
            const acceptedOffersOfRequests = offersOfRequests.filter(
                (offer) => offer.status === OfferStatus.ACCEPTED
            );
            const acceptedOffersOfStream = await asyncFilter(
                acceptedOffersOfRequests,
                async (offer) => await offer.hasEffectOn(stream)
            );
            if (acceptedOffersOfStream.length === 0) {
                throw new Error(
                    "You haven't accepted any offers for this stream"
                );
            }
            await stream.allocate(user);
        }
    }

    /**
     * A user can deallocate multiple staff members from a session if ETHER
     * They are admin
     * OR
     * They are course coordinator of the course of this session, AND ALL of
     * the following conditions hold
     *      The staff member has to be working on said session
     *
     * @param {SessionStream} stream stream to deallocate users from
     * @param {User[]} staff users to be deallocated from stream
     * @param {User} user user performing this action
     */
    public async deallocateMultiple(
        stream: SessionStream,
        staff: User[],
        user: User
    ) {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        const allocatedUsers = (await this.loaders.user.loadMany(
            stream.allocatedUserIds
        )) as User[];
        const allocatedUserIds = allocatedUsers.map((user) => user.id);
        for (const staffMember of staff) {
            if (!allocatedUserIds.includes(staffMember.id)) {
                throw new Error(
                    `User ${staffMember.name} does not work on that session`
                );
            }
        }
        if (user.isAdmin || (await user.isCoordinatorOf(course, term))) {
            await stream.deallocate(...staff);
        }
        throw new Error(PERM_ERR);
    }

    /**
     * A user can deallocate another staff member from a session if ETHER
     * They are admin
     * OR
     * They are a staff member of the course of this session, AND ALL of the
     * following conditions hold
     *      There is an offer that points to one of their requests
     *      The request is for a session of stream and the request is of type
     *          PERMANENT
     *      The offer status is ACCEPTED
     *      The deallocated staff is the user themself
     * OR
     * They are staff member of the course of this session, AND ALL of the
     * following conditions hold
     *      There is an offer that points to one of their requests
     *      The acceptedSession field points to this session, OR
     *          The request is of type PERMANENT and the acceptedSession field
     *            points to a session of the same stream that precedes
     *            this session
     *      The offer status is ACCEPTED
     *      The deallocated staff is the offer maker
     *
     * @param {SessionStream} stream stream to deallocate user from
     * @param {User} staff user to deallocate from stream
     * @param {User} user user performing this action
     * @protected
     */
    public async deallocateSingleFromOffer(
        stream: SessionStream,
        staff: User,
        user: User
    ): Promise<void> {
        const allocatedUsers = (await this.loaders.user.loadMany(
            stream.allocatedUserIds
        )) as User[];
        const allocatedUserIds = allocatedUsers.map((user) => user.id);
        if (!allocatedUserIds.includes(staff.id)) {
            throw new Error(`User ${staff.name} does not work on that session`);
        }
        if (staff.id === user.id) {
            // User deallocates themself after accepting an offer
            if (!allocatedUserIds.includes(user.id)) {
                throw new Error(`You are not allocated to ${stream.name}`);
            }
            const requestsOfUser = (await this.loaders.staffRequest.loadMany(
                user.requestIds
            )) as StaffRequest[];
            const requestsOfSession = await asyncFilter(
                requestsOfUser,
                async (request) => await request.hasEffectOn(stream)
            );
            if (requestsOfSession.length === 0) {
                throw new Error("You don't have any requests for this session");
            }
            const offerIdsOfRequests = requestsOfSession.reduce<string[]>(
                (offerIds, request) => [...offerIds, ...request.offerIds],
                []
            );
            const offersOfRequests = (await this.loaders.offer.loadMany(
                offerIdsOfRequests
            )) as Offer[];
            const acceptedOffers = offersOfRequests.filter(
                (offer) => offer.status === OfferStatus.ACCEPTED
            );
            if (acceptedOffers.length === 0) {
                throw new Error("You haven't accepted any offer yet.");
            }
            await stream.deallocate(staff);
        } else {
            // User deallocates another user from their session because they
            // accept the offer of that user
            // Get offers of that user
            const offers = (await this.loaders.offer.loadMany(
                staff.offerIds
            )) as Offer[];
            const acceptedOffers = await asyncFilter(
                offers,
                async (offer) => await offer.hasEffectOn(stream)
            );
            const requestsOfAcceptedOffers = acceptedOffers.map(
                (offer) => offer.requestId
            );
            if (
                user.requestIds.every(
                    (id) => !requestsOfAcceptedOffers.includes(id)
                )
            ) {
                throw new Error(
                    "You haven't accepted any offer for this session"
                );
            }
            await stream.deallocate(staff);
        }
    }

    /**
     * A user can clear an allocation of a session stream if EITHER
     * They are admin
     * OR
     * They are course coordinator of the stream
     *
     * @param {SessionStream} stream stream of which the allocation is to be
     *      cleared
     * @param {User} user user performing this action
     */
    public async clearAllocation(
        stream: SessionStream,
        user: User
    ): Promise<void> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            throw new Error(PERM_ERR);
        }
        await stream.clearAllocation();
    }
}
