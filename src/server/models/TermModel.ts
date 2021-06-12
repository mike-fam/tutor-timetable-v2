import { BaseModel } from "./BaseModel";
import { Term } from "../entities";
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
     *
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(): Promise<PermissionState> {
        return { hasPerm: true };
    }
}
