import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { RequestType } from "../types/request";

@InputType()
class RequestFormInputType {
    @Field()
    title: string;

    @Field(() => [Int])
    preferences: number[];

    @Field(() => RequestType)
    duration: RequestType;

    @Field({ nullable: true })
    description: string;

    @Field(() => Int)
    userId: number;

    @Field(() => Int)
    sessionId: number;
}

@Resolver()
export class StaffRequestResolver {
    @Mutation(() => String)
    async createRequest(
        @Arg("requestDetails", () => RequestFormInputType)
        {
            title,
            preferences,
            duration,
            description,
            userId,
            sessionId,
        }: RequestFormInputType
    ): Promise<string> {
        console.log(
            title,
            preferences,
            description,
            duration,
            userId,
            sessionId
        );
        return title;
    }
}
