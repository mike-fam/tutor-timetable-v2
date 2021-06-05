import { BaseModel } from "./BaseModel";
import { Timetable } from "../entities";
import { Utils } from "../utils/Util";
import { Service } from "typedi";

@Service()
export class TimetableModel extends BaseModel<Timetable> {
    public constructor() {
        super();
        this.entityCls = Timetable;
        this.loader = Utils.loaders.timetable;
    }
}
