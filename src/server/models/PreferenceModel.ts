import { BaseModel } from "./BaseModel";
import { CourseStaff, Preference, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";

export class PreferenceModel extends BaseModel<Preference> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = Preference;
        this.loader = loaders.preference;
    }

    /**
     * A user can read a preference entry if EITHER of these holds
     *
     * they are admin
     * OR
     * they are the owner of the preference
     * OR
     * they are course coordinator of the course the preference belongs to
     *
     * @param {Preference} preference preference to be read
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(
        preference: Preference,
        user: User
    ): Promise<PermissionState> {
        const owner = await preference.getOwner();
        if (user.id === owner.id) {
            return { hasPerm: true };
        }
        const course = await preference.getCourse();
        const term = await preference.getTerm();
        if (await user.isCoordinatorOf(course, term)) {
            return { hasPerm: true };
        }
        return { hasPerm: false };
    }

    /**
     * A user can update a preference if
     * they are admin
     * OR
     * they are the preference owner AND
     *      they don't modify the course staff of the preference
     *
     * @param {Preference} preference preference to be read
     * @param {Partial} updatedFields fields to be updated
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canUpdate(
        preference: Preference,
        updatedFields: Partial<Preference>,
        user: User
    ): Promise<PermissionState> {
        const owner = await preference.getOwner();
        if (owner.id !== user.id) {
            return {
                hasPerm: false,
            };
        }
        // Disallow modification of course staff
        if (
            updatedFields.courseStaffId &&
            updatedFields.courseStaffId !== preference.courseStaffId
        ) {
            return {
                hasPerm: false,
            };
        }
        if (updatedFields.courseStaff) {
            const updatedCourseStaff =
                (await updatedFields.courseStaff) as CourseStaff;
            if (updatedCourseStaff.id !== preference.courseStaffId) {
                return {
                    hasPerm: false,
                    errMsg: "You cannot change the owner of your preference",
                };
            }
        }
        return { hasPerm: true };
    }

    /**
     * Only admins can delete preferences (Hopefully they know what they do)
     * Users cannot delete their own preferences. They can only update them
     *
     * @param {Preference} preference preference object to delete
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canDelete(
        preference: Preference,
        user: User
    ): Promise<PermissionState> {
        // This is not really needed. I just want to put this here because
        // I want to include the documentation here
        return super.canDelete(preference, user);
    }

    /**
     * A person can create a new preference entry if EITHER
     * they are admin
     * OR
     * they are course coordinator of the course and term of the preference
     * OR
     * they are the owner of the preference AND they work in said course and
     * term
     *
     * @param {Preference} preference preference object to be created
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canCreate(
        preference: Preference,
        user: User
    ): Promise<PermissionState> {
        const courseStaff =
            (await preference.courseStaff) ||
            (await this.loaders.courseStaff.load(preference.courseStaffId));
        const course = await courseStaff.getCourse();
        const term = await courseStaff.getTerm();
        if (await user.isCoordinatorOf(course, term)) {
            return { hasPerm: true };
        } else if (await user.isStaffOf(course, term)) {
            return { hasPerm: user.id === courseStaff.userId };
        }
        return { hasPerm: false };
    }
}
