import { BaseModel } from "./BaseModel";
import { SessionStream, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DeepPartial } from "typeorm";
import { Utils } from "../utils/Util";

export class SessionStreamModel extends BaseModel<SessionStream> {
    public constructor() {
        super();
        this.entityCls = SessionStream;
        this.loader = Utils.loaders.sessionStream;
    }
    /**
     * A user can read a preference entry if EITHER of these holds
     *
     * they are admin
     * OR
     * they are a staff member of the course the stream belongs to
     * @param stream
     * @param user
     * @protected
     */
    protected async canRead(
        stream: SessionStream,
        user: User
    ): Promise<PermissionState> {
        const course = await stream.getCourse();
        const term = await stream.getTerm();
        if (!(await user.isStaffOf(course, term))) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can update a session stream if EITHER of these conditions holds
     *
     * They are admin
     * OR
     * They are the course coordinator of the session stream
     *
     * If they are the course coordinator, ALL of the following conditions apply
     *      * If the session stream is based on another stream, they cannot
     *          modify the startTime, endTime, day and type of that stream
     *          WITHOUT setting based to null first
     *      * They cannot change the timetable of the stream
     * @param stream
     * @param updatedFields
     * @param user
     * @protected
     */
    protected async canUpdate(
        stream: SessionStream,
        updatedFields: DeepPartial<SessionStream>,
        user: User
    ): Promise<PermissionState> {
        // if (!)
        return { hasPerm: false };
    }
}
