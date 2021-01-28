import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";

@InputType()
class RequestFormInputType {
    @Field()
    title: string;

    @Field(() => [Int])
    preferences: number[];

    @Field()
    duration: string;

    @Field({ nullable: true })
    description: string;
}

@Resolver()
export class StaffRequestResolver {
    @Mutation(() => String)
    async createRequest(
        @Arg("requestDetails", () => RequestFormInputType)
        { title, preferences, duration, description }: RequestFormInputType
    ): Promise<string> {
        console.log(title);
        return title;
    }
}
