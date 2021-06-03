import { BaseModel } from "./BaseModel";
import { CourseStaff, Preference, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DeepPartial } from "typeorm";

export class PreferenceModel extends BaseModel<Preference>() {
    /**
     * A user can read a preference entry if EITHER of these holds
     *
     * they are admin
     * OR
     * they are the owner of the preference
     * OR
     * they are course coordinator of the course the preference belongs to
     * @param preference
     * @param user
     * @protected
     */
    protected static async canRead(
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
     *      * they don't modify the course staff of the preference
     * @param preference
     * @param updatedFields
     * @param user
     * @protected
     */
    protected static async canUpdate(
        preference: Preference,
        updatedFields: DeepPartial<Preference>,
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
            const updatedCourseStaff = (await updatedFields.courseStaff) as CourseStaff;
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
     * @param preference
     * @param user
     * @protected
     */
    protected static async canDelete(
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
     * @param preference
     * @param user
     * @protected
     */
    protected static async canCreate(
        preference: Preference,
        user: User
    ): Promise<PermissionState> {
        const courseStaff =
            (await preference.courseStaff) ||
            (await Preference.loaders.preference.load(
                preference.courseStaffId
            ));
        const course = await courseStaff.getCourse();
        const term = await courseStaff.getTerm();
        if (!(await user.isCoordinatorOf(course, term))) {
            return { hasPerm: false };
        }
        return { hasPerm: true };
    }
}
