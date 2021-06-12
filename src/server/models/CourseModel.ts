import { BaseModel } from "./BaseModel";
import { Course, Term, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";

/**
 * Manages course-related permissions
 * Only admins can create and delete courses
 * Read and update permissions are described below
 */
export class CourseModel extends BaseModel<Course> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = Course;
        this.loader = loaders.course;
    }

    /**
     * Anyone can read any course
     *
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(): Promise<PermissionState> {
        return {
            hasPerm: true,
        };
    }

    /**
     * Checks if a user can update a course
     * Only CURRENT course coordinators or admins can update courses.
     * Only admins can change the course code
     *
     * @param {Course} course course object to be updated
     * @param {Partial<Course>} updatedFields fields to be updated
     * @param {User} user user performing this action
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canUpdate(
        course: Course,
        updatedFields: Partial<Course>,
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
