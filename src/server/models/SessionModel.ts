import { BaseModel } from "./BaseModel";
import { Session, SessionAllocation, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DeepPartial } from "typeorm";
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";
import { PERM_ERR } from "../constants";

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
     * They are the course coordinator AND they only make change to the location
     * (For updating the allocation, see the allocate and deallocate methods)
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
        const course = await session.getCourse();
        const term = await session.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return { hasPerm: false };
        }
        if (!isEmpty(omit(updatedFields, "location"))) {
            return {
                hasPerm: false,
                errMsg: "You can only change the location of a session",
            };
        }
        return { hasPerm: true };
    }

    /**
     * A user can delete a session if they are course coordinator of that
     * session
     * @param session
     * @param user
     * @protected
     */
    protected static async canDelete(
        session: Session,
        user: User
    ): Promise<PermissionState> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can create a session if EITHER
     * they are admin
     * OR
     * they are course coordinator of that session
     * @param session
     * @param user
     * @protected
     */
    protected static async canCreate(
        session: Session,
        user: User
    ): Promise<PermissionState> {
        const sessionStream =
            (await session.sessionStream) ||
            (await Session.loaders.sessionStream.load(session.sessionStreamId));
        const course = await sessionStream.getCourse();
        const term = await sessionStream.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return {
                hasPerm: false,
            };
        }
        return { hasPerm: true };
    }

    /**
     * A user can allocate a staff member to a session if EITHER
     *
     * They are admin
     * OR
     * They are course coordinator of the session, AND ALL of the following hold
     *      * The staff member has to work in the same course in the same term
     *      * The staff member is not already on that session
     * @param session
     * @param staff
     * @param user
     * @protected
     */
    protected static async allocate(
        session: Session,
        staff: User,
        user: User
    ): Promise<void> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            throw new Error(PERM_ERR);
        }
        if (!(await staff.isStaffOf(course, term))) {
            throw new Error(
                `User ${staff.name} does not work in ` +
                    `${course.code} in ${term.type}, ${term.year}.`
            );
        }
        const allocatedUsers = await session.getAllocatedUsers();
        if (allocatedUsers.map((user) => user.id).includes(staff.id)) {
            throw new Error(
                `User ${staff.name} already works in that session.`
            );
        }
        await session.allocate(staff);
    }

    /**
     * A user can deallocate another staff member from a session if
     *      * They are course coordinator of the session, AND
     *      * The staff member has to work on said session
     * @param session
     * @param staff
     * @param user
     * @protected
     */
    protected static async deallocate(
        session: Session,
        staff: User,
        user: User
    ): Promise<void> {
        const course = await session.getCourse();
        const term = await session.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            throw new Error(PERM_ERR);
        }
        const allocation = await SessionAllocation.findOne({
            session,
            user,
        });
        if (!allocation) {
            throw new Error(`User ${staff.name} does not work on that session`);
        }
        await session.deallocate(staff);
    }
}
