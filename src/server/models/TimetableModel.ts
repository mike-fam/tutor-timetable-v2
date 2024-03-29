import { BaseModel } from "./BaseModel";
import { Timetable, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";

export class TimetableModel extends BaseModel<Timetable> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = Timetable;
        this.loader = loaders.timetable;
    }

    /**
     * A user can read a timetable if EITHER
     * they are admin
     * OR
     * they are staff of that timetable
     *
     * @param {Timetable} timetable timetable object to read
     * @param {User} user user performing read operation
     * @returns {PermissionState} object specifying if they have permission for
     *      this action
     */
    protected async canRead(
        timetable: Timetable,
        user: User
    ): Promise<PermissionState> {
        const course = await timetable.getCourse();
        const term = await timetable.getTerm();
        return {
            hasPerm: await user.isStaffOf(course, term),
        };
    }

    /**
     * A user can update a timetable if EITHER
     * They are admin
     * OR
     * They are course coordinator of that timetable, AND ALL of the following
     * conditions hold
     *      They don't change the course and the term of the timetable
     *      They don't change the allocation token
     *
     * @param {Timetable} timetable timetable object to update
     * @param {Partial<Timetable>} updatedFields fields to update
     * @param {User} user user performing the action
     * @returns {PermissionState} specifies if user can perform this action
     * @protected
     */
    protected async canUpdate(
        timetable: Timetable,
        updatedFields: Partial<Timetable>,
        user: User
    ): Promise<PermissionState> {
        const course = await timetable.getCourse();
        const term = await timetable.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return {
                hasPerm: false,
            };
        }
        if (updatedFields.termId && updatedFields.termId !== term.id) {
            return { hasPerm: false };
        }
        if (updatedFields.term && (await updatedFields.term).id !== term.id) {
            return { hasPerm: false };
        }
        if (updatedFields.courseId && updatedFields.courseId !== course.id) {
            return { hasPerm: false };
        }
        if (
            updatedFields.course &&
            (await updatedFields.course).id !== course.id
        ) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can delete a timetable if they are admin
     *
     * @param {Timetable} timetable timetable object to delete
     * @param {User} user user performing the delete action
     * @returns {PermissionState} specifies if user can perform this action
     * @protected
     */
    protected async canDelete(
        timetable: Timetable,
        user: User
    ): Promise<PermissionState> {
        return await super.canDelete(timetable, user);
    }

    /**
     * A user can create a timetable if they are admin
     *
     * @returns {PermissionState} specifies if user can perform this action
     * @protected
     */
    protected async canCreate(): Promise<PermissionState> {
        return { hasPerm: false };
    }
}
