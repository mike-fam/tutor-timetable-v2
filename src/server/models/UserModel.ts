import { BaseModel } from "./BaseModel";
import { User } from "../entities";
import { PermissionState } from "../types/permission";
import intersection from "lodash/intersection";
import omit from "lodash/omit";
import isEmpty from "lodash/isEmpty";
import { DataLoaders } from "../types/dataloaders";
import { PERM_ERR, redacted } from "../constants";
import { asyncSome } from "../../utils/array";

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
     * @param _
     * @param __
     * @protected
     */
    protected async canUpdate(
        toUpdate: User,
        _: Partial<User>,
        __: User
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
     * A user can create another user entry if EITHER
     * they are admin
     * OR
     * their name and emails are redacted (i.e. a dummy user)
     * @param toCreate
     * @param user
     * @protected
     */
    protected async canCreate(
        toCreate: User,
        user: User
    ): Promise<PermissionState> {
        if (
            toCreate.name &&
            toCreate.name === redacted &&
            toCreate.email &&
            toCreate.email === redacted
        ) {
            return { hasPerm: true };
        }
        return super.canCreate(toCreate, user);
    }

    public async getOrCreateUserByUsernames(
        usernames: string[],
        user: User
    ): Promise<User[]> {
        if (usernames.length === 0) {
            return [];
        }
        const existingUsers = await User.find({
            where: usernames.map((username) => ({
                username,
            })),
        });
        if (
            await asyncSome(
                existingUsers,
                async (toGet) => !(await this.permRead(toGet, user)).hasPerm
            )
        ) {
            throw new Error(PERM_ERR);
        }
        const remainingUsernames = usernames.filter(
            (username) =>
                !existingUsers.map((user) => user.username).includes(username)
        );
        const newUsers = await this.createMany(
            remainingUsernames.map((username) => ({
                username,
                name: redacted,
                email: redacted,
            })),
            user
        );
        return [...existingUsers, ...newUsers];
    }
}
