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
import { getConnection } from "typeorm";
import { RequestStatus, RequestType } from "../../server/types/request";
import {
    Course,
    Session,
    SessionStream,
    StaffRequest,
    User,
} from "../entities";

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
        const requester = await User.findOneOrFail({ id: userId });
        const session = await Session.findOneOrFail({ id: sessionId });
        const swapPreference = Session.findByIds(preferences);

        const isUnique =
            (
                await StaffRequest.find({
                    requester: requester,
                    session: session,
                })
            ).length > 0
                ? false
                : true;

        // Displays the session name in the error.
        if (!isUnique) {
            const sessionStream = await SessionStream.findOne({
                id: (await Session.findOne({ id: sessionId }))?.sessionStreamId,
            });
            throw new Error(
                "You have already made a request for " + sessionStream?.name
            );
        }

        const request = StaffRequest.create({
            title,
            description,
            type: duration,
            requester,
            status: RequestStatus.OPEN,
            session,
        });
        request.swapPreference = swapPreference;
        return await request.save();
    }

    // Used for displaying requests in modal.
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

    // Used for displaying all requests associated with the user.
    @Query(() => [StaffRequest])
    async getRequestsByUserId(
        @Arg("userId", () => Int) userId: number
    ): Promise<StaffRequest[]> {
        const user = await User.findOne({ id: userId });

        if (user) {
            return await StaffRequest.find({ requester: user });
        } else {
            throw new Error("User not found");
        }
    }

    // Used for displaying requests on the main requests page.
    @Query(() => [StaffRequest])
    async getRequestsByCourseIds(
        @Arg("courseIds", () => [Int]) courseIds: number[]
    ): Promise<StaffRequest[]> {
        return await getConnection()
            .getRepository(StaffRequest)
            .createQueryBuilder("staffRequest")
            .innerJoinAndSelect("staffRequest.session", "session")
            .innerJoinAndSelect("session.sessionStream", "sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where("timetable.courseId IN (:...courseIds)", { courseIds })
            .getMany();
    }
}
