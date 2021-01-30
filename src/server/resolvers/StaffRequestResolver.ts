import { ArrayMinSize, IsString, MinLength } from "class-validator";
import {
    Arg,
    Field,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { RequestStatus, RequestType } from "../../server/types/request";
import { Session, SessionStream, StaffRequest, User } from "../entities";

@InputType()
class RequestFormInputType {
    @Field()
    @MinLength(1)
    title: string;

    @Field(() => [Int])
    @ArrayMinSize(1)
    preferences: number[];

    @Field(() => RequestType)
    duration: RequestType;

    @Field({ nullable: true })
    @IsString()
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

        const isUnique =
            (
                await StaffRequest.find({
                    requester: requester,
                    session: session,
                })
            ).length > 0
                ? false
                : true;

        // Displays the session name in the error. Let me know if this is too much.
        if (!isUnique) {
            const session = await SessionStream.findOne({
                id: (await Session.findOne({ id: sessionId }))?.sessionStreamId,
            });
            throw new Error(
                "You have already made a request for " + session?.name
            );
        }

        // Currently does not store swap preferences.
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

    @Query(() => StaffRequest)
    async getRequestById(
        @Arg("requestId", () => Int) requestId: number
    ): Promise<StaffRequest> {
        const result = await StaffRequest.findOne({ id: requestId });
        if (result) {
            return result;
        } else {
            throw new Error("Request does not exist");
        }
    }

    @Query(() => [StaffRequest])
    async getRequestsByUserId(
        @Arg("userId", () => Int) userId: number
    ): Promise<StaffRequest[]> {
        const user = await User.findOne({ id: userId });

        if (user) {
            const result = await StaffRequest.find({ requester: user });
            if (result.length > 0) {
                return result;
            } else {
                throw new Error("Request not found");
            }
        } else {
            throw new Error("User not found");
        }
    }
}
