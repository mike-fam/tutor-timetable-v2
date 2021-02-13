import { IsEmail } from "class-validator";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { User } from "../entities";
import { MyContext } from "../types/context";

@InputType()
export class UpdateEmailInputType {
    @Field()
    @IsEmail()
    email: string;
}

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
        return req.user;
    }

    @Mutation(() => User)
    async updateName(
        @Ctx() { req }: MyContext,
        @Arg("newName") newName: string
    ): Promise<User> {
        const user = req.user!;
        user.name = newName;
        return await user.save();
    }

    @Mutation(() => User)
    async updateEmail(
        @Ctx() { req }: MyContext,
        @Arg("newEmail") { email }: UpdateEmailInputType
    ): Promise<User> {
        const user = req.user!;
        user.email = email;
        return await user.save();
    }
}
