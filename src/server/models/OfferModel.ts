import { BaseModel } from "./BaseModel";
import { Offer, User } from "../entities";
import { DeepPartial } from "typeorm";

export class OfferModel extends BaseModel<Offer>() {
    protected static entityCls = Offer;

    /**
     * A user can read an offer entry if they are admin or they work in the
     * same course as the offer maker
     * @param offer
     * @param user
     * @protected
     */
    protected static async canRead(offer: Offer, user: User): Promise<boolean> {
        if (user.isAdmin) {
            return true;
        }
        const course = await offer.getCourse();
        const term = await offer.getTerm();
        return await user.isStaffOf(course, term);
    }

    /**
     * A user can update an offer if they are admin or the offer maker.
     * The offer maker can NOT change
     *      * the request or requestId of the offer.
     *      * the creator of the offer (i.e. themselves)
     *      * the status of the offer (it has to be changed by the original
     *          requester when accepting or rejecting the offer.
     * @param toUpdate
     * @param updatedFields
     * @param user
     * @protected
     */
    protected static async canUpdate(
        toUpdate: Offer,
        updatedFields: DeepPartial<Offer>,
        user: User
    ): Promise<boolean> {
        if (user.isAdmin) {
            return true;
        }
        // TODO
        return false;
    }
}
