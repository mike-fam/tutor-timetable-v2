import { BaseModel } from "./BaseModel";
import { CourseStaff, Preference, Timetable, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";

export class CourseStaffModel extends BaseModel<CourseStaff> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = CourseStaff;
        this.loader = loaders.courseStaff;
    }

    /**
     * A user can read a course staff entry if they are a staff of the same
     * course in the same term
     * TODO Fill parameters
     *
     * @param {CourseStaff} courseStaff course staff object to be read
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(
        courseStaff: CourseStaff,
        user: User
    ): Promise<PermissionState> {
        if (user.isAdmin) {
            return { hasPerm: true };
        }
        const loaders = this.loaders;
        const userRoles: CourseStaff[] = (await loaders.courseStaff.loadMany(
            user.courseStaffIds
        )) as CourseStaff[];

        return {
            hasPerm: userRoles.some(
                (userRole) => courseStaff.timetableId === userRole.timetableId
            ),
        };
    }

    /**
     * A user can update a course staff entry if they are the course coordinator
     * or the admin
     * The course coordinator can NOT change the timetable or the preference
     * of the course staff entry
     *
     * @param {CourseStaff} toUpdate course staff object to be updated
     * @param {Partial<CourseStaff>} updatedFields fields to be updated
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canUpdate(
        toUpdate: CourseStaff,
        updatedFields: Partial<CourseStaff>,
        user: User
    ): Promise<PermissionState> {
        const course = await toUpdate.getCourse();
        const term = await toUpdate.getTerm();
        // Check if user is coordinator
        if (!(await user.isCoordinatorOf(course, term))) {
            return { hasPerm: false };
        }
        // Can assume user is coordinator from this point
        // Disallow changing timetable
        if (
            updatedFields.timetableId &&
            updatedFields.timetableId !== toUpdate.timetableId
        ) {
            return { hasPerm: false };
        }
        const timetable = updatedFields.timetable as Timetable | undefined;
        if (timetable && timetable.id !== toUpdate.timetableId) {
            return { hasPerm: false };
        }
        // Disallow changing preferences
        if (
            updatedFields.preferenceId &&
            updatedFields.preferenceId !== toUpdate.preferenceId
        ) {
            return { hasPerm: false };
        }
        const preference = updatedFields.preference as Preference | undefined;
        if (preference && preference.id !== toUpdate.preferenceId) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }

    /**
     * A user can delete a course staff entry if they are admin or the coordinator
     * of that course in that term
     *
     * @param {CourseStaff} toDelete course staff object to delete
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canDelete(
        toDelete: CourseStaff,
        user: User
    ): Promise<PermissionState> {
        const course = await toDelete.getCourse();
        const term = await toDelete.getTerm();
        return { hasPerm: await user.isCoordinatorOf(course, term) };
    }

    /**
     * A user can create a new course staff entry if they are admin or course
     * coordinator of that course
     *
     * @param {CourseStaff} toCreate course staff object to create
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canCreate(
        toCreate: CourseStaff,
        user: User
    ): Promise<PermissionState> {
        // Cannot use course and term directly, have to use timetableId here
        const loaders = this.loaders;
        const timetable =
            (toCreate.timetable as Timetable) ||
            (await loaders.timetable.load(toCreate.timetableId));
        const course = await timetable.getCourse();
        const term = await timetable.getTerm();
        return { hasPerm: await user.isCoordinatorOf(course, term) };
    }
}
