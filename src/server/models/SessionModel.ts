import { BaseModel } from "./BaseModel";
import { Offer, Session, StaffRequest, User } from "../entities";
import { PermissionState } from "../types/permission";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import { PERM_ERR } from "../constants";
import { OfferStatus } from "../types/offer";
import asyncFilter from "node-filter-async";
import { DataLoaders } from "../types/dataloaders";

export class SessionModel extends BaseModel<Session> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = Session;
        this.loader = loaders.session;
    }

    /**
     * A user can read a session if they are admin OR
     * they work in the same course that the session belongs to
     *
     * @param {Session} session session to read
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(
        session: Session,
        user: User
    ): Promise<PermissionState> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        return { hasPerm: await user.isStaffOf(course, term) };
    }

    /**
     * A user can update a session if ANY of these conditions hold
     * They are admin
     * OR
     * They are the course coordinator AND they only make change to the location
     * (For updating the allocation, see the allocate and deallocate methods)
     *
     * @param {Session} session session to update
     * @param {Partial<Session>} updatedFields fields to be updated
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canUpdate(
        session: Session,
        updatedFields: Partial<Session>,
        user: User
    ): Promise<PermissionState> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return { hasPerm: false };
        }
        if (!isEmpty(omit(updatedFields, ["location", "allocatedUserIds"]))) {
            return {
                hasPerm: false,
                errMsg: "You can only change the location or the allocation of a session",
            };
        }
        return { hasPerm: true };
    }

    /**
     * A user can delete a session if they are course coordinator of that
     * session
     *
     * @param {Session} session session to delete
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canDelete(
        session: Session,
        user: User
    ): Promise<PermissionState> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can create a session if EITHER
     * they are admin
     * OR
     * they are course coordinator of that session
     *
     * @param {Session} session session to create
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canCreate(
        session: Session,
        user: User
    ): Promise<PermissionState> {
        const sessionStream =
            (await session.sessionStream) ||
            (await this.loaders.sessionStream.load(session.sessionStreamId));
        const course = await sessionStream.getCourse();
        const term = await sessionStream.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return {
                hasPerm: false,
            };
        }
        return { hasPerm: true };
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
     * @param {Session} session session to allocate users to
     * @param {User} staff users to allocate to sessions
     * @param {User} user user performing this action
     * @protected
     */
    public async allocateMultiple(
        session: Session,
        staff: User[],
        user: User
    ): Promise<void> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        const allocatedUsers = (await this.loaders.user.loadMany(
            session.allocatedUserIds
        )) as User[];
        const allocatedUserIds = allocatedUsers.map((user) => user.id);
        // Disallow if staff is already allocated to this session
        for (const staffMember of staff) {
            if (allocatedUserIds.includes(staffMember.id)) {
                throw new Error(
                    `User ${staffMember.name} already works in that session.`
                );
            }
        }
        // If not course coordinator
        if (!(await user.isCoordinatorOf(course, term))) {
            throw new Error(PERM_ERR);
        }
        // Disallow if staff is not of same course and same term
        for (const staffMember of staff) {
            if (!(await staffMember.isStaffOf(course, term))) {
                throw new Error(
                    `User ${staffMember.name} does not work in ` +
                        `${course.code} in ${term.type}, ${term.year}.`
                );
            }
        }
        await session.allocate(...staff);
    }

    /**
     * A user can allocate a single staff member to a session if EITHER
     * they are admin
     * OR
     * They are a staff member of this session, AND ALL of the following hold
     *      There is a request that points to this session OR
     *          The request is of type PERMANENT and points to a session of
     *            the same stream that precedes this session
     *      They are the requester
     *      There is an offer of the request that has a status of ACCEPTED
     *      That offer has to be the offer that's accepted most recently
     *      The allocated staff is the offer maker
     * OR
     * They are a staff member of this session, AND ALL of the following hold
     *      There is an accepted offer with the acceptedSession field pointing
     *          to this session OR
     *          The request of the offer is of type PERMANENT and session is
     *              subsequent to the offer's session's
     *      The request of that offer is made by user
     *      That offer is the most recently accepted offer that points to
     *          that session
     *      The staff member allocated to session must be the user
     *
     * @param {Session} session session to allocate user to
     * @param {User} staff user to be allocated to session
     * @param {User} user user performing this action
     * @protected
     */
    public async allocateSingle(
        session: Session,
        staff: User,
        user: User
    ): Promise<void> {
        const allocatedUsers = (await this.loaders.user.loadMany(
            session.allocatedUserIds
        )) as User[];
        const allocatedUserIds = allocatedUsers.map((user) => user.id);
        // Disallow if staff is already allocated to this session
        if (allocatedUserIds.includes(staff.id)) {
            throw new Error(
                `User ${staff.name} already works in that session.`
            );
        }
        // Get requests of this user
        const loaders = this.loaders;
        const userRequests = (await loaders.staffRequest.loadMany(
            user.requestIds
        )) as StaffRequest[];
        if (allocatedUserIds.includes(user.id)) {
            // Get requests that points to this session
            const affectingRequests = await asyncFilter(
                userRequests,
                async (request) => await request.hasEffectOn(session)
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
            await session.allocate(staff);
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
            const acceptedOffersOfSession = await asyncFilter(
                acceptedOffersOfRequests,
                async (offer) => await offer.hasEffectOn(session)
            );
            if (acceptedOffersOfSession.length === 0) {
                throw new Error(
                    "You haven't accepted any offers for this session"
                );
            }
            await session.allocate(user);
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
     * @param {Session} session session to deallocate users from
     * @param {User[]} staff users to deallocate from session
     * @param {User} user user performing this action
     */
    public async deallocateMultiple(
        session: Session,
        staff: User[],
        user: User
    ) {
        const course = await session.getCourse();
        const term = await session.getTerm();
        const allocatedUsers = (await this.loaders.user.loadMany(
            session.allocatedUserIds
        )) as User[];
        const allocatedUserIds = allocatedUsers.map((user) => user.id);
        for (const staffMember of staff) {
            if (!allocatedUserIds.includes(staffMember.id)) {
                throw new Error(
                    `User ${staffMember.name} does not work on that session`
                );
            }
        }
        if (await user.isCoordinatorOf(course, term)) {
            await session.deallocate(...staff);
        }
    }

    /**
     * A user can deallocate another staff member from a session if ETHER
     * They are admin
     * OR
     * They are a staff member of the course of this session, AND ALL of the
     * following conditions hold
     *      There is an offer that points to one of their requests
     *      The request is of this session, OR
     *          The request is of type PERMANENT and is of a session of the
     *            same stream that precedes this session
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
     * @param {Session} session session to deallocate user from
     * @param {User} staff user to be deallocated
     * @param {User} user user performing this action
     * @protected
     */
    public async deallocateSingle(
        session: Session,
        staff: User,
        user: User
    ): Promise<void> {
        const allocatedUsers = (await this.loaders.user.loadMany(
            session.allocatedUserIds
        )) as User[];
        const allocatedUserIds = allocatedUsers.map((user) => user.id);
        if (!allocatedUserIds.includes(staff.id)) {
            throw new Error(`User ${staff.name} does not work on that session`);
        }
        if (staff.id === user.id) {
            // User deallocates themself after accepting an offer
            const requestsOfUser = (await this.loaders.staffRequest.loadMany(
                user.requestIds
            )) as StaffRequest[];
            const requestsOfSession = await asyncFilter(
                requestsOfUser,
                async (request) => await request.hasEffectOn(session)
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
            await session.deallocate(staff);
        } else {
            // User deallocates another user from their session because they
            // accept the offer of that user
            // Get offers of that user
            const offers = (await this.loaders.offer.loadMany(
                staff.offerIds
            )) as Offer[];
            const acceptedOffers = await asyncFilter(
                offers,
                async (offer) => await offer.hasEffectOn(session)
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
            await session.deallocate(staff);
        }
    }

    /**
     * A user can clear an allocation of a session if EITHER
     * They are admin
     * OR
     * They are course coordinator of the stream
     *
     * @param {Session} session session to clear the allocation of
     * @param {User} user user performing this action
     */
    public async clearAllocation(session: Session, user: User): Promise<void> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            throw new Error(PERM_ERR);
        }
        await session.clearAllocation();
    }
}
