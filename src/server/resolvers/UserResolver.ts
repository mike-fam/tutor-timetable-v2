import { IsEmail, IsNotEmpty } from "class-validator";
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
export class UpdateDetailsInputType {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    name: string;
}

@Resolver()
export class UserResolver {
    @Query(() => User)
    async me(@Ctx() { req }: MyContext): Promise<User> {
        return req.user;
    }

    @Mutation(() => User)
    async updateDetails(
        @Ctx() { req }: MyContext,
        @Arg("details") { name, email }: UpdateDetailsInputType
    ): Promise<User> {
        const user = req.user!;
        user.name = name;
        user.email = email;
        return await user.save();
    }
}
