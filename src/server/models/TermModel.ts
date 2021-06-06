import { BaseModel } from "./BaseModel";
import { Term, User } from "../entities";
import { PermissionState } from "../types/permission";
import { Service } from "typedi";

/**
 * Everyone can read a term
 * Only admins can add, make updates to and delete terms.
 */
@Service()
export class TermModel extends BaseModel<Term> {
    /**
     * Everyone can read a term entry
     * @param term
     * @param user
     */
    protected async canRead(term: Term, user: User): Promise<PermissionState> {
        return { hasPerm: true };
    }
}
