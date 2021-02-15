import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entities";
import { MyContext } from "../types/context";

@Resolver()
export class UserResolver {
    @Query(() => User)
    async me(@Ctx() { req }: MyContext): Promise<User> {
        return req.user!;
    }
}
