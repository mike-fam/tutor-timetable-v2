import { BaseModel } from "./BaseModel";
import { CourseStaff, User } from "../entities";
import { DeepPartial } from "typeorm";

export class CourseStaffModel extends BaseModel<CourseStaff>() {
    protected static entityCls = CourseStaff;

    /**
     * A user can read a course staff entry if they are a staff of the same
     * course in the same term
     * TODO Fill parameters
     * @param courseStaff
     * @param user
     * @protected
     */
    protected static async canRead(
        courseStaff: CourseStaff,
        user: User
    ): Promise<boolean> {
        if (user.isAdmin) {
            return true;
        }
        const loaders = CourseStaff.loaders;
        const userRoles: CourseStaff[] = (await loaders.courseStaff.loadMany(
            user.courseStaffIds
        )) as CourseStaff[];

        return userRoles.some(
            (userRole) => courseStaff.timetableId === userRole.timetableId
        );
    }

    /**
     * A user can update a course staff entry if they are the course coordinator
     * or the admin
     * The course coordinator can NOT change the timetable or the preference
     * of the course staff entry
     *
     * TODO Fill parameters
     * @param toUpdate
     * @param updatedFields
     * @param user
     * @protected
     */
    protected static async canUpdate(
        toUpdate: CourseStaff,
        updatedFields: DeepPartial<CourseStaff>,
        user: User
    ): Promise<boolean> {
        if (user.isAdmin) {
            return true;
        }
        const course = await toUpdate.getCourse();
        const term = await toUpdate.getTerm();
        // Check if user is coordinator
        if (!(await user.isCoordinatorOf(course, term))) {
            return false;
        }
        // Can assume user is coordinator from this point
        // Disallow changing timetable
        if (
            updatedFields.timetableId &&
            updatedFields.timetableId !== toUpdate.timetableId
        ) {
            return false;
        }
        // Disallow changing preferences
        return (
            !!updatedFields.preferenceId ||
            updatedFields.preferenceId === toUpdate.preferenceId
        );
    }

    /**
     * A user can delete a course staff entry if they are admin or the coordinator
     * of that course in that term
     * TODO Fill parameters
     * @param toDelete
     * @param user
     * @protected
     */
    protected static async canDelete(
        toDelete: CourseStaff,
        user: User
    ): Promise<boolean> {
        if (user.isAdmin) {
            return true;
        }
        const course = await toDelete.getCourse();
        const term = await toDelete.getTerm();
        return user.isCoordinatorOf(course, term);
    }

    /**
     * A user can create a new course staff entry if they are admin or course
     * coordinator of that course
     * TODO: Fill in parameters
     * @param toCreate
     * @param user
     * @protected
     */
    protected static async canCreate(
        toCreate: CourseStaff,
        user: User
    ): Promise<boolean> {
        // Cannot use course and term directly, have to use timetableId here
        const loaders = CourseStaff.loaders;
        const timetable = await loaders.timetable.load(toCreate.timetableId);
        const course = await timetable.getCourse();
        const term = await timetable.getTerm();
        return await user.isCoordinatorOf(course, term);
    }
}
