import { BaseModel } from "./BaseModel";
import { Term, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";

/**
 * Everyone can read a term
 * Only admins can add, make updates to and delete terms.
 */
export class TermModel extends BaseModel<Term> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = Term;
        this.loader = loaders.term;
    }

    /**
     * Everyone can read a term entry
     * @param term
     * @param user
     */
    protected async canRead(term: Term, user: User): Promise<PermissionState> {
        return { hasPerm: true };
    }
}
