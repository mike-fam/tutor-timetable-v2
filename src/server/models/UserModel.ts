import { BaseModel } from "./BaseModel";
import { User } from "../entities";
import { Utils } from "../utils/Util";
import { Service } from "typedi";

@Service()
export class UserModel extends BaseModel<User> {
    public constructor() {
        super();
        this.entityCls = User;
        this.loader = Utils.loaders.user;
    }
}
