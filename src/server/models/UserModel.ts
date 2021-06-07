import { BaseModel } from "./BaseModel";
import { User } from "../entities";
import { PermissionState } from "../types/permission";
import intersection from "lodash/intersection";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";
import { DataLoaders } from "../types/dataloaders";

export class UserModel extends BaseModel<User> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = User;
        this.loader = loaders.user;
    }

    /**
     * A user can read a user entry if EITHER
     * they are admin
     * OR
     * they work in a same course as this user
     * @param toRead
     * @param user
     * @protected
     */
    protected async canRead(
        toRead: User,
        user: User
    ): Promise<PermissionState> {
        const myCourses = await user.coursesWorkingIn();
        const theirCourses = await toRead.coursesWorkingIn();
        const myCourseIds = myCourses.map((course) => course.id);
        const theirCourseIds = theirCourses.map((course) => course.id);
        return {
            hasPerm: intersection(myCourseIds, theirCourseIds).length > 0,
        };
    }

    /**
     * A user can update a user entry if EITHER
     * they are admin
     * OR
     * they are the user AND ALL of the following hold
     *      * They only change their name
     *
     * @param toUpdate
     * @param updatedFields
     * @param user
     * @protected
     */
    protected async canUpdate(
        toUpdate: User,
        updatedFields: Partial<User>,
        user: User
    ): Promise<PermissionState> {
        const disallowedFields = omit(toUpdate, "name");
        return {
            hasPerm: isEmpty(disallowedFields),
        };
    }

    /**
     * A user can delete another user entry if they are admin
     * @param toDelete
     * @param user
     * @protected
     */
    protected async canDelete(
        toDelete: User,
        user: User
    ): Promise<PermissionState> {
        return super.canDelete(toDelete, user);
    }

    /**
     * A user can create another user entry if they are admin
     * @param toCreate
     * @param user
     * @protected
     */
    protected async canCreate(
        toCreate: User,
        user: User
    ): Promise<PermissionState> {
        return super.canCreate(toCreate, user);
    }
}
