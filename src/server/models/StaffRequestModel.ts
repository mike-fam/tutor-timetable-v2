import { BaseModel } from "./BaseModel";
import { StaffRequest } from "../entities";
import { Utils } from "../utils/Util";

export class StaffRequestModel extends BaseModel<StaffRequest> {
    public constructor() {
        super();
        this.entityCls = StaffRequest;
        this.loader = Utils.loaders.staffRequest;
    }
}
