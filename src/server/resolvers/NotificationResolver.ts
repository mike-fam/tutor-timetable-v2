import { Arg, Resolver, Root, Subscription } from "type-graphql";
import { MyContext } from "../types/context";
import { User } from "../entities";

@Resolver()
export class NotificationResolver {
    @Subscription(() => String, {
        topics: "NOTIFICATIONS",
        filter: async ({
            payload,
            context,
        }: {
            payload: [string, User[]];
            context: MyContext;
        }) => {
            const users = payload[1];
            return users.map((user) => user.id).includes(context.req.user.id);
        },
    })
    async notifications(@Root() payload: [string, User[]]): Promise<string> {
        return payload[0];
    }
}
