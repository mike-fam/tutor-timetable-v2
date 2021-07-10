import { Models } from "../server/types/models";
import { Notification, User } from "../server/entities";
import { Publisher } from "type-graphql";
import { asyncForEach } from "./array";

export const publishNotification = async (
    notificationLike: { title: string; message: string },
    models: Models,
    user: User,
    receivers: User[],
    publish: Publisher<Notification>
) => {
    const notifications = await models.notification.createMany(
        receivers.map((user) => ({
            ...notificationLike,
            userId: user.id,
        })),
        user
    );
    await asyncForEach(
        notifications,
        async (notification) => await publish(notification)
    );
};
