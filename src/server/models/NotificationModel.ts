import { BaseModel } from "./BaseModel";
import { CourseStaff, Notification, User } from "../entities";
import { PermissionState } from "../types/permission";
import { DataLoaders } from "../types/dataloaders";

export class NotificationModel extends BaseModel<Notification> {
    public constructor(loaders: DataLoaders) {
        super(loaders);
        this.entityCls = Notification;
        this.loader = loaders.notification;
    }

    /**
     * Only admins or notified users can see their notification
     *
     * @param {Notification} notification notification to be read
     * @param {User} user user who reads the notification
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canRead(
        notification: Notification,
        user: User
    ): Promise<PermissionState> {
        return {
            hasPerm: notification.userId === user.id,
        };
    }

    /**
     * Checks if a user can update a notification
     * Only admins can update a notification
     *
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canUpdate(): Promise<PermissionState> {
        return {
            hasPerm: false,
        };
    }

    /**
     * Checks if a user can delete a notification
     * Only admins can delete a notification
     *
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canDelete(): Promise<PermissionState> {
        return {
            hasPerm: false,
        };
    }

    /**
     * A user can create a new notification if they work in the same course of
     * the user the notification is for
     *
     * @param {Notification} notification notification object to be created
     * @param {User} user user who creates the notification
     * @returns {PermissionState} indicates if user can perform this action
     * @protected
     */
    protected async canCreate(
        notification: Notification,
        user: User
    ): Promise<PermissionState> {
        let notifiedUser: User;
        if (notification.userId) {
            notifiedUser = await this.loaders.user.load(notification.userId);
        } else {
            notifiedUser = await notification.user;
        }
        if (!notifiedUser) {
            throw new Error(
                "Attempted to create a notification without any notified user"
            );
        }
        const creatorCourseStaff = (await this.loaders.courseStaff.loadMany(
            user.courseStaffIds
        )) as CourseStaff[];
        const notifiedCourseStaff = (await this.loaders.courseStaff.loadMany(
            notifiedUser.courseStaffIds
        )) as CourseStaff[];
        const creatorTimetableIds = creatorCourseStaff.map(
            (courseStaff) => courseStaff.timetableId
        );
        const notifiedTimetableIds = notifiedCourseStaff.map(
            (courseStaff) => courseStaff.timetableId
        );
        return {
            hasPerm: creatorTimetableIds.some((timetableId) =>
                notifiedTimetableIds.includes(timetableId)
            ),
        };
    }
}
