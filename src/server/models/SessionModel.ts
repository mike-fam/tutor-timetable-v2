import { BaseModel } from "./BaseModel";
import { Session, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DeepPartial } from "typeorm";

export class SessionModel extends BaseModel<Session>() {
    /**
     * A user can read a session if they are admin OR
     * they work in the same course that the session belongs to
     * @param session
     * @param user
     * @protected
     */
    protected static async canRead(
        session: Session,
        user: User
    ): Promise<PermissionState> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        return { hasPerm: await user.isStaffOf(course, term) };
    }

    /**
     * A user can update a session if ANY of these conditions hold
     * They are admin
     * OR
     * They are the course coordinator AND
     *      * They don't change the session stream
     *      * They
     * @param session
     * @param updatedFields
     * @param user
     * @protected
     */
    protected static async canUpdate(
        session: Session,
        updatedFields: DeepPartial<Session>,
        user: User
    ): Promise<PermissionState> {
        return { hasPerm: false };
    }
}
