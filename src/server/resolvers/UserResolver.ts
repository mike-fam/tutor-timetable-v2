import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entities";
import { MyContext } from "../../types/context";

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
        console.log(req.user);
        return req.user;
    }
}
