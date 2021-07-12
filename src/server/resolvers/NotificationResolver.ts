import { Arg, Resolver, Root, Subscription } from "type-graphql";
import { Notification } from "../entities";

@Resolver(() => Notification)
export class NotificationResolver {
    @Subscription(() => Notification, {
        topics: "NOTIFICATIONS",
        filter: async ({
            payload,
            args,
        }: {
            payload: Notification;
            args: { key: string };
        }) => {
            return payload.userId === args.key;
        },
    })
    async notifications(
        @Root() payload: Notification,
        @Arg("key") _: string
    ): Promise<Notification> {
        return payload;
    }
}
