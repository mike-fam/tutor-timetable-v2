import { BaseModel } from "./BaseModel";
import { Course, Term, User } from "../entities";
import { DeepPartial } from "typeorm";

/**
 * Manages course-related permissions
 * Only admins can create and delete courses
 * Read and update permissions are described below
 */
export class CourseModel extends BaseModel<Course>() {
    protected static entityCls = Course;

    /**
     * Anyone can read courses
     * TODO: Fill parameters
     * @param course
     * @param user
     * @protected
     */
    protected static async canRead(
        course: Course,
        user: User
    ): Promise<boolean> {
        return true;
    }

    /**
     * Checks if a user can update a course
     * Only course coordinators or admins can update courses.
     * Only admins can change the course code
     * TODO: Fill parameters
     * @param course
     * @param updatedFields
     * @param user
     * @protected
     */
    protected static async canUpdate(
        course: Course,
        updatedFields: DeepPartial<Course>,
        user: User
    ): Promise<boolean> {
        // Check if user is course coordinator of course
        if (!(await user.isCoordinatorOf(course, await Term.getActiveTerm()))) {
            return user.isAdmin;
        }
        // User is coordinator of course at this point
        return !updatedFields.code || updatedFields.code === course.code;
    }
}
