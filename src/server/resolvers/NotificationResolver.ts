import { Arg, Ctx, Resolver, Root, Subscription } from "type-graphql";
import { Notification } from "../entities";
import { MyContext } from "../types/context";

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
        @Arg("key") key: string,
        @Ctx() ctx: MyContext
    ): Promise<Notification> {
        return payload;
    }
}
