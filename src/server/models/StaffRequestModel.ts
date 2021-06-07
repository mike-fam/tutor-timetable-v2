import { BaseModel } from "./BaseModel";
import { Session, StaffRequest, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DeepPartial } from "typeorm";
import { RequestStatus } from "../types/request";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";
import { asyncSome } from "../../utils/array";
import { DataLoaders } from "../types/dataloaders";
import isBefore from "date-fns/isBefore";

export class StaffRequestModel extends BaseModel<StaffRequest> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = StaffRequest;
        this.loader = loaders.staffRequest;
    }

    /**
     * A user can delete a request if EITHER
     * They are admin
     * OR
     * They are the requester and the request has not had an accepted offer yet
     * @param request
     * @param user
     */
    protected async canDelete(
        request: StaffRequest,
        user: User
    ): Promise<PermissionState> {
        if (request.requesterId !== user.id) {
            return { hasPerm: false };
        }
        if ((await request.getAcceptedOffer()) === null) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can create a request if EITHER
     * they are admin
     * OR
     * ALL of the following applies
     *      * The requester has to be themself
     *      * They are allocated to the session the request points to
     *      * They are not allocated to any of the swapPreference
     *      * They have not made a request for the same session
     *      * The session is not in the past
     *      * The request does not conflict with the freeze state
     * @param request
     * @param user
     */
    protected async canCreate(
        request: StaffRequest,
        user: User
    ): Promise<PermissionState> {
        // Check if the requester is themself
        let requesterId;
        if (request.requesterId) {
            requesterId = request.requesterId;
        } else if (request.requester) {
            requesterId = (await request.requester).id;
        } else {
            return {
                hasPerm: false,
                errMsg: "Requester field missing",
            };
        }
        if (requesterId !== user.id) {
            return {
                hasPerm: false,
                errMsg: "The requester must be yourself",
            };
        }
        // Check if session field provided
        let session: Session;
        if (request.sessionId) {
            session = await this.loaders.session.load(request.sessionId);
        } else if (request.session) {
            session = await request.session;
        } else {
            return {
                hasPerm: false,
                errMsg: "Session field missing",
            };
        }
        // Check if session is in the past
        const sessionDate = await session.date();
        if (isBefore(sessionDate, new Date())) {
            return {
                hasPerm: false,
                errMsg: "This session is in the past"
            };
        }
        // Check if user actually works on the session on the request
        const course = await session.getCourse();
        const term = await session.getTerm();
        const allocatedSessions = await user.getAllocatedSessions(course, term);
        const allocatedSessionIds = allocatedSessions.map(
            (session) => session.id
        );
        if (!allocatedSessionIds.includes(session.id)) {
            return {
                hasPerm: false,
                errMsg: "You are not allocated to that session",
            };
        }
        // Checks if user is already allocated to that session
        let swapPreferenceIds;
        if (request.swapPreference) {
            swapPreferenceIds = ((await request.swapPreference) as Session[]).map(
                (session) => session.id
            );
        } else if (request.swapPreferenceSessionIds) {
            swapPreferenceIds = request.swapPreferenceSessionIds;
        }
        if (swapPreferenceIds) {
            if (
                swapPreferenceIds.some((sessionId) =>
                    allocatedSessionIds.includes(sessionId)
                )
            ) {
                return {
                    hasPerm: false,
                    errMsg:
                        "You already work on one of the sessions in your swap" +
                        " preferences",
                };
            }
        }
        // Check if user already made a request for that session
        const userRequests = (await this.loader.loadMany(
            user.requestIds
        )) as StaffRequest[];
        if (
            await asyncSome(
                userRequests,
                async (request) => await request.hasEffectOn(session)
            )
        ) {
            return {
                hasPerm: false,
                errMsg: "You already made a request that affects this session",
            };
        }
        if (await request.offers) {
            // Check if user provides any offer
            return {
                hasPerm: false,
                errMsg: "New requests should not have any offer",
            };
        }
        // Check if user provides the finaliser
        if (request.finaliserId || (await request.finaliser)) {
            return {
                hasPerm: false,
                errMsg: "New requests should not have a finaliser",
            };
        }
        return { hasPerm: true };
    }

    /**
     * A user can read a request if EITHER
     * they are admin
     * OR
     * they work on the same course and term of the request
     * @param request
     * @param user
     * @protected
     */
    protected async canRead(
        request: StaffRequest,
        user: User
    ): Promise<PermissionState> {
        const course = await request.getCourse();
        const term = await request.getTerm();
        return {
            hasPerm: await user.isStaffOf(course, term),
        };
    }

    /**
     * A person can update a request if EITHER
     * They are admin
     * OR
     * They are the course coordinator of the person making the request, AND ALL
     * of the following conditions hold
     *      * They can only change the status from OPEN to CLOSED
     *      * They can change the finaliser to themself
     *      * They cannot change ANY other field
     * OR
     * They are the requester and ALL of the following conditions hold
     *      * They cannot change the session the request points to
     *      * They cannot change the finaliser or the offers
     *      * They can change the request status to closed IFF
     *          * The request has an offer with the status of ACCEPTED
     *      * They don't work on any of the swap preference
     * @param request
     * @param updatedField
     * @param user
     * @protected
     */
    protected async canUpdate(
        request: StaffRequest,
        updatedField: DeepPartial<StaffRequest>,
        user: User
    ): Promise<PermissionState> {
        const course = await request.getCourse();
        const term = await request.getTerm();
        if (await user.isCoordinatorOf(course, term)) {
            if (!isEmpty(omit(updatedField, ["status", "finaliser"]))) {
                return { hasPerm: false };
            }
            if (
                updatedField.status &&
                updatedField.status !== RequestStatus.CLOSED
            ) {
                return {
                    hasPerm: false,
                    errMsg: "You can only change the request status to CLOSED",
                };
            }
            if (
                (request.status !== RequestStatus.CLOSED ||
                    updatedField.status !== RequestStatus.CLOSED) &&
                updatedField.finaliserId &&
                updatedField.finaliserId !== user.id
            ) {
                return {
                    hasPerm: false,
                    errMsg: "You can only set yourself to be the finaliser",
                };
            }
            if (
                (request.status === RequestStatus.CLOSED ||
                    updatedField.status === RequestStatus.CLOSED) &&
                updatedField.finaliser &&
                ((await updatedField.finaliser) as User).id !== user.id
            ) {
                return {
                    hasPerm: false,
                    errMsg: "You can only set yourself to be the finaliser",
                };
            }
        } else if (request.requesterId === user.id) {
            if (
                updatedField.sessionId &&
                updatedField.sessionId !== request.sessionId
            ) {
                return {
                    hasPerm: false,
                };
            }
            if (
                updatedField.session &&
                ((await updatedField.session) as Session).id !==
                    request.sessionId
            ) {
                return {
                    hasPerm: false,
                };
            }
            if (
                updatedField.finaliserId &&
                updatedField.finaliserId !== request.finaliserId
            ) {
                return {
                    hasPerm: false,
                };
            }
            if (
                updatedField.finaliser &&
                ((await updatedField.finaliser) as User).id !==
                    request.finaliserId
            ) {
                return {
                    hasPerm: false,
                };
            }
            if (
                request.status !== RequestStatus.CLOSED &&
                updatedField.status === RequestStatus.CLOSED
            ) {
                return {
                    hasPerm: (await request.getAcceptedOffer()) !== null,
                };
            }
            let swapPreferenceIds;
            if (updatedField.swapPreference) {
                swapPreferenceIds = ((await updatedField.swapPreference) as Session[]).map(
                    (session) => session.id
                );
            } else if (updatedField.swapPreferenceSessionIds) {
                swapPreferenceIds = updatedField.swapPreferenceSessionIds;
            }
            if (swapPreferenceIds) {
                const allocatedSessions = await user.getAllocatedSessions(
                    course,
                    term
                );
                const allocatedSessionIds = allocatedSessions.map(
                    (session) => session.id
                );
                if (
                    swapPreferenceIds.some((sessionId) =>
                        allocatedSessionIds.includes(sessionId)
                    )
                ) {
                    return {
                        hasPerm: false,
                        errMsg:
                            "You already work on one of the sessions in your swap preferences",
                    };
                }
            }
            return { hasPerm: true };
        }
        return { hasPerm: false };
    }
}
