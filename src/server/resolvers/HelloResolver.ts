import { Ctx, Publisher, PubSub, Query, Resolver } from "type-graphql";
import { Notification } from "../entities";
import { publishNotification } from "../../utils/notification";
import { MyContext } from "../types/context";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    async hello(
        @PubSub("NOTIFICATIONS") publish: Publisher<Notification>,
        @Ctx() { req, models }: MyContext
    ): Promise<string> {
        await publishNotification(
            {
                title: "Hello world",
                message: "Hi everyone",
            },
            models,
            req.user,
            [req.user],
            publish
        );
        return "Hello world";
    }
}
