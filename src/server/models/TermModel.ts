import { BaseModel } from "./BaseModel";
import { Term, User } from "../entities";
import { PermissionState } from "../types/permission";

/**
 * Everyone can read a term
 * Only admins can add, make updates to and delete terms.
 */
export class TermModel extends BaseModel<Term> {
    /**
     * Everyone can read a term entry
     * @param term
     * @param user
     */
    public async canRead(term: Term, user: User): Promise<PermissionState> {
        return { hasPerm: true };
    }
}
