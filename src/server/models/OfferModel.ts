import { BaseModel } from "./BaseModel";
import { Offer, StaffRequest, User } from "../entities";
import { DeepPartial } from "typeorm";
import { PermissionState } from "../types/permission";

export class OfferModel extends BaseModel<Offer>() {
    protected static entityCls = Offer;

    /**
     * A user can read an offer entry if they are admin or they work in the
     * same course as the offer maker
     * @param offer
     * @param user
     * @protected
     */
    protected static async canRead(
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
     *      * the request or requestId of the offer.
     *      * the creator of the offer (i.e. themselves)
     *      * the status of the offer (it has to be changed by the original
     *          requester when accepting or rejecting the offer.
     * @param offer
     * @param updatedFields
     * @param user
     * @protected
     */
    protected static async canUpdate(
        offer: Offer,
        updatedFields: DeepPartial<Offer>,
        user: User
    ): Promise<PermissionState> {
        if (user.id !== (await offer.getOwner()).id) {
            return { hasPerm: false };
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
        const request = updatedFields.request as StaffRequest | undefined;
        if (request && request.id !== offer.requestId) {
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
                errMsg: "The offer owner has to be yourself",
            };
        }
        // Prevent manual change of offer status
        if (updatedFields.status && updatedFields.status !== offer.status) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can delete an offer if ANY of these conditions hold
     *      * they are admin
     *      * they are course coordinator (i.e. supervisor) of the offer maker
     *      * they are the offer maker
     * @param offer
     * @param user
     * @protected
     */
    protected static async canDelete(
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
        return { hasPerm: offer.userId === user.id };
    }

    /**
     *
     * A user can create an offer if they are admin,
     * OR
     * if ALL of these conditions hold
     *      * They are the maker of the offer, i.e. the user field has to refer
     *          to themself
     *      * They are a staff member of the same course and term of the request
     *          maker
     *      * The request the offer is directed to is not their own request
     *      * They have not already made an offer for that request
     *      * That request is not frozen
     *
     * @param offer
     * @param user
     * @protected
     */
    protected static async canCreate(
        offer: Offer,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: user.isAdmin };
    }
}
