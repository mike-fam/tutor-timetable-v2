import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { User, UserSettings } from "../entities";
import { MyContext } from "../types/context";

@Resolver(() => UserSettings)
export class UserSettingsResolver {
    @FieldResolver(() => User)
    async user(
        @Root() root: UserSettings,
        @Ctx() { req, models }: MyContext
    ): Promise<User> {
        return await models.user.getById(root.userId, req.user);
    }
}
