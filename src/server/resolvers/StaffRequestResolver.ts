import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { RequestStatus, RequestType } from "../../server/types/request";
import { Session, StaffRequest, User } from "../entities";

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
    @Mutation(() => StaffRequest)
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
    ): Promise<StaffRequest> {
        const requester = await User.findOne({ id: userId });
        const session = await Session.findOne({ id: sessionId });
        const swapPreference = await Session.findByIds(preferences);

        const isUnique = (await StaffRequest.find({
            requester: requester,
            session: session,
        }))
            ? false
            : true;

        if (!isUnique) {
            throw new Error(
                "You have already made a request for this session."
            );
        }

        return await StaffRequest.create({
            title,
            description,
            type: duration,
            requester,
            status: RequestStatus.OPEN,
            session,
            swapPreference,
        }).save();
    }
}
