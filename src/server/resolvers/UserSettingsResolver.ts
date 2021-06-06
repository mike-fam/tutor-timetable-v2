import { EntityResolver } from "./EntityResolver";
import { Service } from "typedi";
import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { User, UserSettings } from "../entities";
import { MyContext } from "../types/context";

@Service()
@Resolver(() => UserSettings)
export class UserSettingsResolver extends EntityResolver {
    @FieldResolver(() => User)
    async user(
        @Root() root: UserSettings,
        @Ctx() { req }: MyContext
    ): Promise<User> {
        return this.userModel.getById(root.userId, req.user);
    }
}
