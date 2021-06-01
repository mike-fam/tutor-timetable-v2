import { BaseModel } from "./BaseModel";
import { Course, Term, User } from "../entities";
import { DeepPartial } from "typeorm";
import { PermissionState } from "../types/permission";

/**
 * Manages course-related permissions
 * Only admins can create and delete courses
 * Read and update permissions are described below
 */
export class CourseModel extends BaseModel<Course>() {
    protected static entityCls = Course;

    /**
     * Anyone can read any course
     * TODO: Fill parameters
     * @param course
     * @param user
     * @protected
     */
    protected static async canRead(
        course: Course,
        user: User
    ): Promise<PermissionState> {
        return {
            hasPerm: true,
        };
    }

    /**
     * Checks if a user can update a course
     * Only CURRENT course coordinators or admins can update courses.
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
    ): Promise<PermissionState> {
        // Check if user is course coordinator of course
        if (!(await user.isCoordinatorOf(course, await Term.getActiveTerm()))) {
            return {
                hasPerm: false,
                errMsg:
                    "You have to be course coordinator to update this course",
            };
        }
        // User is coordinator of course at this point, check if course code is
        // modified
        return {
            hasPerm: !updatedFields.code || updatedFields.code === course.code,
            errMsg: "Only admins can change the course code",
        };
    }
}
