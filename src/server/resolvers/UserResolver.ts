import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { CourseStaff, User } from "../entities";
import { MyContext } from "../types/context";
import { getConnection } from "typeorm";

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
        return req.user;
    }
}
