import { BaseModel } from "./BaseModel";
import { Offer, Session, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DeepPartial } from "typeorm";

export class SessionModel extends BaseModel<Session>() {
    /**
     * A user can read an session if they are admin OR
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
}
