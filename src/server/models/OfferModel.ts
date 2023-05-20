import { BaseModel } from "./BaseModel";
import { Offer, Session, StaffRequest, Timetable, User } from "../entities";
import { FindOptionsWhere } from "typeorm";
import { PermissionState } from "../types/permission";
import {
    PERMANENT_LOCK_MESSAGE,
    RequestStatus,
    RequestType,
    TEMPORARY_LOCK_MESSAGE,
} from "../types/request";
import { OfferStatus } from "../types/offer";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import {
    canAcceptOffer,
    canMakeNewOffer,
    canRequestForApproval,
} from "../utils/requests";
import { DataLoaders } from "../types/dataloaders";

export class OfferModel extends BaseModel<Offer> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = Offer;
        this.loader = loaders.offer;
    }

    public async update(
        toUpdateFind: FindOptionsWhere<Offer>,
        updatedFields: Partial<Offer>,
        user: User
    ): Promise<Offer> {
        const offer = await Offer.findOneBy(toUpdateFind);
        if (
            offer &&
            offer.status !== OfferStatus.ACCEPTED &&
            updatedFields.status === OfferStatus.ACCEPTED
        ) {
            updatedFields.acceptedDate = new Date();
        }
        return await super.update(toUpdateFind, updatedFields, user);
    }

    /**
     * A user can read an offer entry if they are admin OR
     * they work in the same course as the offer maker
     *
     * @param {Offer} offer offer object to be read
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(
        offer: Offer,
        user: User
    ): Promise<PermissionState> {
        const course = await offer.getCourse();
        const term = await offer.getTerm();
        return { hasPerm: await user.isStaffOf(course, term) };
    }

    /**
     * A user can update an offer if they are admin or the offer maker.
     * The offer maker can NOT change ANY of these fields
     *      the request or requestId of the offer.
     *      the creator of the offer (i.e. themselves)
     *      the status of the offer (it has to be changed by the original
     *          requester when accepting or rejecting the offer.
     * The offer maker CAN make changes to the preferences, but it has to
     * satisfy ALL of the following constraints
     *      preference MUST only contain ONLY sessions they are assigned to
     *      ALL sessions must be of the same course and term
     *
     * The original requester CAN ONLY make changes to the offer status
     * and NO OTHER field.
     * The status can be changed to REJECTED, ACCEPTED or AWAITING_APPROVAL.
     * They can NOT change the status to ACCEPTED if
     * there is already another offer of the same request that's accepted,
     * OR
     * if the request's status is not OPEN, OR if the request is frozen.
     *
     * Course coordinators can change the state of the offer status from
     * AWAITING_APPROVAL to ACCEPTED or REJECTED
     *
     * @param {Offer} offer offer object to update
     * @param {Partial} updatedFields fields to be updated
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canUpdate(
        offer: Offer,
        updatedFields: Partial<Offer>,
        user: User
    ): Promise<PermissionState> {
        const request = await this.loaders.staffRequest.load(offer.requestId);
        const course = await offer.getCourse();
        const term = await offer.getTerm();
        const timetable = await Timetable.fromCourseTerm(course, term);
        // If user is the offer maker
        if (user.id === (await offer.getOwner()).id) {
            // Prevent manual change of offer status
            if (updatedFields.status && updatedFields.status !== offer.status) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot manually change the offer status",
                };
            }
            // Prevent change of request id
            if (
                updatedFields.requestId &&
                updatedFields.requestId !== offer.requestId
            ) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the request of an offer",
                };
            }
            const requestToUpdate = updatedFields.request as
                | StaffRequest
                | undefined;
            if (requestToUpdate && requestToUpdate.id !== offer.requestId) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the request of an offer",
                };
            }
            // Prevent change of offer owner
            if (updatedFields.userId && updatedFields.userId !== offer.userId) {
                return {
                    hasPerm: false,
                    errMsg: "The offer owner has to be yourself",
                };
            }
            const owner = updatedFields.user as StaffRequest | undefined;
            if (owner && owner.id !== offer.userId) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot update the owner of an offer",
                };
            }
            // Check if offer preferences only contain sessions the user works on
            const allocatedSessions = await user.getAllocatedSessions(
                course,
                term
            );
            const allocatedSessionIds = allocatedSessions.map(
                (session) => session.id
            );
            const preferences = (await updatedFields.preferences) as Session[];
            if (
                preferences &&
                preferences.some(
                    (preference) => !allocatedSessionIds.includes(preference.id)
                )
            ) {
                return {
                    hasPerm: false,
                    errMsg:
                        "You cannot include a session that you are not " +
                        "allocated to as a preference",
                };
            }
            // Respect requester's swap preference
            if (!request.allowNonPrefOffers) {
                const sessionPreferenceIds = (await offer.preferences).map(
                    (session) => session.id
                );
                // If any of sessionPreferenceIds not in request.swapPreference
                if (
                    sessionPreferenceIds.some(
                        (sessionId) =>
                            !request.swapPreferenceSessionIds.includes(
                                sessionId
                            )
                    )
                ) {
                    return {
                        hasPerm: false,
                        errMsg:
                            "You cannot specify a session that's not included" +
                            "in the original swap preference",
                    };
                }
            }
            return { hasPerm: true };
            // If user is the requester
        } else if (user.id === request.requesterId) {
            // Disallow changing any field other than `status`
            if (!isEmpty(omit(updatedFields, "status"))) {
                return { hasPerm: false };
            }
            // Disallow any operation if offer is not open
            if (offer.status !== OfferStatus.OPEN) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot make changes to an offer that's not open",
                };
            }
            // Always allow user to reject the offer
            if (updatedFields.status === OfferStatus.REJECTED) {
                return { hasPerm: true };
            }
            // If user wants to accept the offer
            if (
                updatedFields.status === OfferStatus.ACCEPTED ||
                updatedFields.status === OfferStatus.AWAITING_APPROVAL
            ) {
                // Prevent user from accepting a closed request
                if (request.status !== RequestStatus.OPEN) {
                    return {
                        hasPerm: false,
                        errMsg: "You cannot accept an offer of a closed request.",
                    };
                }
                // Prevent user from marking offer as accepted when there's a
                // freeze
                if (
                    updatedFields.status === OfferStatus.ACCEPTED &&
                    !canAcceptOffer(request, timetable)
                ) {
                    return {
                        hasPerm: false,
                        errMsg:
                            "Cannot accept request because requests either" +
                            " are frozen or need to be approved by course " +
                            "coordinators",
                    };
                }
                // Prevent user from requesting offer approval if request is frozen
                if (
                    updatedFields.status === OfferStatus.AWAITING_APPROVAL &&
                    !canRequestForApproval(request, timetable)
                ) {
                    return {
                        hasPerm: false,
                        errMsg:
                            "Cannot request for approval because requests" +
                            " are currently frozen",
                    };
                }
                // Prevent user from accepting multiple offers
                const otherOffers = (await this.loaders.offer.loadMany(
                    request.offerIds
                )) as Offer[];
                if (
                    !otherOffers.some(
                        (offer) =>
                            offer.status === OfferStatus.ACCEPTED ||
                            offer.status === OfferStatus.AWAITING_APPROVAL
                    )
                ) {
                    return {
                        hasPerm: false,
                        errMsg:
                            "You have already accepted an offer for this " +
                            "request.",
                    };
                }
                // Prevent user from accepting an offer without specifying the
                // swap if offerer enforces it
                if (
                    offer.mustSwap &&
                    !updatedFields.acceptedSession &&
                    !updatedFields.acceptedSessionId
                ) {
                    return {
                        hasPerm: false,
                        errMsg:
                            "You have to specify the session you want to " +
                            "swap with the offerer.",
                    };
                }
                // Prevent user from setting the accepted session to a session
                // that's not one of the offerer's preferences
                let acceptedSession: Session;
                if (updatedFields.acceptedSessionId) {
                    acceptedSession = await this.loaders.session.load(
                        updatedFields.acceptedSessionId
                    );
                } else {
                    acceptedSession =
                        (await updatedFields.acceptedSession) as Session;
                }
                if (!offer.preferenceSessionIds.includes(acceptedSession.id)) {
                    return {
                        hasPerm: false,
                        errMsg:
                            "You have to accept one of the sessions that" +
                            "the offerer specified.",
                    };
                }
                // Allow user to accept offer by this point
                return { hasPerm: true };
            }
            // Disallow updating the offer status to any other value
            return { hasPerm: false };
            // If user is course coordinator
        } else if (await user.isCoordinatorOf(course, term)) {
            // Disallow changing any field other than `status`
            if (!isEmpty(omit(updatedFields, "status"))) {
                return { hasPerm: false };
            }
            // Disallow any operation if offer is not awaiting for approval
            if (offer.status !== OfferStatus.AWAITING_APPROVAL) {
                return {
                    hasPerm: false,
                    errMsg:
                        "You cannot make changes to an offer that's not " +
                        "awaiting for your approval",
                };
            }
            // Disallow changing offer status to anything other than rejected
            // and accepted
            if (
                updatedFields.status !== OfferStatus.REJECTED &&
                updatedFields.status !== OfferStatus.ACCEPTED
            ) {
                return {
                    hasPerm: false,
                    errMsg: "You can only approve or reject this offer.",
                };
            }
            return { hasPerm: true };
        }
        return { hasPerm: false };
    }

    /**
     * A user can delete an offer if
     * they are admin
     * OR
     * they are course coordinator (i.e. supervisor) of the offer maker
     * OR
     * they are the offer maker AND the status of the offer is not ACCEPTED
     *
     * @param {Offer} offer offer object to delete
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canDelete(
        offer: Offer,
        user: User
    ): Promise<PermissionState> {
        const course = await offer.getCourse();
        const term = await offer.getTerm();
        // Course coordinator
        if (await user.isCoordinatorOf(course, term)) {
            return { hasPerm: true };
        }
        // Allow offer owner only
        if (offer.userId !== user.id) {
            return { hasPerm: false };
        }
        if (offer.status === OfferStatus.ACCEPTED) {
            return {
                hasPerm: false,
                errMsg: "You cannot delete an offer that's already accepted",
            };
        }
        return { hasPerm: true };
    }

    /**
     *
     * A user can create an offer if they are admin,
     * OR
     * if ALL of these conditions hold
     *      They are the maker of the offer, i.e. the user field has to refer
     *          to themself
     *      They are a staff member of the same course and term of the request
     *          maker
     *      The offer is not for one of their own requests
     *      They have not already made an offer for said request
     *      That request is not frozen
     *      if that request has `allowNonPrefOffers` set to false,
     *          all sessions specified in the `preferences` field have to
     *          be in the `swapPreference` field of the request.
     *      That user has not already worked on the session on the request
     *      The swap preference only contains sessions that they work on
     *
     * @param {Offer} offer offer object to create
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canCreate(
        offer: Offer,
        user: User
    ): Promise<PermissionState> {
        const loaders = this.loaders;
        // Check if user on offer and user making request are the same person
        if (offer.userId && offer.userId !== user.id) {
            return {
                hasPerm: false,
                errMsg: "You cannot create a new offer on behalf of someone else",
            };
        }
        const offerMaker = offer.user as User | undefined;
        if (offerMaker && offerMaker.id !== user.id) {
            return {
                hasPerm: false,
                errMsg: "You cannot create a new offer on behalf of someone else",
            };
        }

        // Check if user works on the same course and term of the requester
        const requestId = offer.requestId || (await offer.request).id;
        const request = await loaders.staffRequest.load(requestId);
        const course = await request.getCourse();
        const term = await request.getTerm();
        if (!(await user.isStaffOf(course, term))) {
            return {
                hasPerm: false,
                errMsg: "You cannot make an offer for a request of another course",
            };
        }
        // Check if offer is for a request of that user
        const requester = await request.getOwner();
        if (requester.id === user.id) {
            return {
                hasPerm: false,
                errMsg: "You cannot make an offer for a request of your own",
            };
        }
        // Check if user already has an offer of that request
        const offersMade = (await loaders.offer.loadMany(
            user.offerIds
        )) as Offer[];
        const requestIds = offersMade.map((offer) => offer.requestId);
        if (requestIds.includes(requestId)) {
            return {
                hasPerm: false,
                errMsg: "You already made an offer for this request",
            };
        }
        // Check if user already works on session in request
        const session = await loaders.session.load(request.sessionId);
        const allocatedUsers = (await loaders.user.loadMany(
            session.allocatedUserIds
        )) as User[];
        if (allocatedUsers.some((allocated) => allocated.id === user.id)) {
            return {
                hasPerm: false,
                errMsg:
                    "You cannot make an offer for this request because you" +
                    " work on the requested session.",
            };
        }
        // Check if offer preferences only contain sessions the user works on
        // and all the sessions belong to the same course and term
        const allocatedSessions = await user.getAllocatedSessions(course, term);
        const allocatedSessionIds = allocatedSessions.map(
            (session) => session.id
        );
        const preferences = (await offer.preferences) as Session[];
        if (
            preferences &&
            preferences.some(
                (preference) => !allocatedSessionIds.includes(preference.id)
            )
        ) {
            return {
                hasPerm: false,
                errMsg:
                    "You cannot include a session that you are not " +
                    "allocated to as a preference",
            };
        }

        // Check if request is frozen
        const timetable = await Timetable.fromCourseTerm(course, term);
        if (!canMakeNewOffer(request, timetable)) {
            return {
                hasPerm: false,
                errMsg:
                    request.type === RequestType.TEMPORARY
                        ? TEMPORARY_LOCK_MESSAGE
                        : PERMANENT_LOCK_MESSAGE,
            };
        }
        // Respect requester's swap preference
        if (!request.allowNonPrefOffers) {
            const sessionPreferenceIds = (await offer.preferences).map(
                (session) => session.id
            );
            // If any of sessionPreferenceIds not in request.swapPreference
            if (
                sessionPreferenceIds.some(
                    (sessionId) =>
                        !request.swapPreferenceSessionIds.includes(sessionId)
                )
            ) {
                return {
                    hasPerm: false,
                    errMsg:
                        "You cannot specify a session that's not included" +
                        "in the original swap preference",
                };
            }
        }
        return { hasPerm: true };
    }
}
