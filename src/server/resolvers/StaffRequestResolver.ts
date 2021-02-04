import {
    ArrayNotEmpty,
    ArrayUnique,
    IsNotEmpty,
    IsString,
} from "class-validator";
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
    SessionAllocation,
    SessionStream,
    StaffRequest,
    Timetable,
    User,
} from "../entities";

@InputType()
class RequestFormInputType {
    @Field()
    @IsNotEmpty()
    title: string;

    // Sessions the user wants to switch into.
    @Field(() => [Int])
    @ArrayNotEmpty()
    @ArrayUnique()
    preferences: number[];

    @Field(() => RequestType)
    duration: RequestType;

    @Field({ nullable: true })
    @IsString()
    description: string;

    @Field(() => Int)
    userId: number;

    // Session user wants to switch out of.
    @Field(() => Int)
    sessionId: number;
}

@InputType()
class EditRequestFormInputType {
    @Field(() => Int)
    requestId: number;

    @Field({ nullable: true })
    @IsNotEmpty()
    title: string;

    // Sessions the user wants to switch into.
    @Field(() => [Int], { nullable: true })
    @ArrayNotEmpty()
    @ArrayUnique()
    preferences: number[];

    @Field(() => RequestType, { nullable: true })
    @IsNotEmpty()
    duration: RequestType;

    @Field({ nullable: true })
    @IsString()
    description: string;

    // Session user wants to switch out of.
    @Field(() => Int, { nullable: true })
    sessionId: number;

    @Field(() => Boolean)
    closeRequest: boolean;
}

@InputType()
class OfferInputType {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;

    @Field(() => Int)
    @IsNotEmpty()
    requestId: number;

    @Field(() => [Session])
    @ArrayUnique()
    @ArrayNotEmpty()
    sessionPreferences: Session[];
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
        const userSessions = await SessionAllocation.find({ userId });
        const userSessionStream = await SessionStream.findOneOrFail({
            id: session.sessionStreamId,
        });
        const userTimeTable = await Timetable.findOneOrFail({
            id: userSessionStream.timetableId,
        });

        // Checks if user is in session.
        if (
            (await SessionAllocation.find({ sessionId, userId })).length === 0
        ) {
            throw new Error(
                "You cannot switch out of a session you are not in"
            );
        }

        // Checks if session is in preferences.
        if (preferences.includes(sessionId)) {
            throw new Error("Your session cannot be in your preferences");
        }

        // Checks if user is trying to switch into a session they are already in.
        if (
            userSessions.filter(
                (item) => preferences.indexOf(item.sessionId) > -1
            ).length !== 0
        ) {
            throw new Error(
                "Your cannot switch into a session you are already in"
            );
        }

        // Checks session preferences exist and if they are part of the correct timetable.
        let swapPreference: Array<Session> = [];
        for (let sid of preferences) {
            const sessionQuery = await Session.findOneOrFail({ id: sid });
            if (sessionQuery.sessionStream.timetableId !== userTimeTable.id) {
                throw new Error(
                    "One or more sessions are from a different course."
                );
            }
            swapPreference.push(sessionQuery);
        }

        // Checks for duplicate requests of a session.
        if (
            (
                await StaffRequest.find({
                    requester: requester,
                    session: session,
                })
            ).length > 0
        ) {
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
        return await StaffRequest.findOneOrFail({ id: requestId });
    }

    // Used for displaying all requests associated with the user.
    @Query(() => [StaffRequest])
    async getRequestsByUserId(
        @Arg("userId", () => Int) userId: number
    ): Promise<StaffRequest[]> {
        const user = await User.findOneOrFail({ id: userId });

        return await StaffRequest.find({ requester: user });
    }

    // Used for displaying requests on the main requests page.
    // TODO: NEEDS TO MAKE SURE THE CORRECT TERM IS BEING USED.
    @Query(() => [StaffRequest])
    async getRequestsByCourseIds(
        @Arg("courseIds", () => [Int]) courseIds: number[]
    ): Promise<StaffRequest[]> {
        // Checks each courseId exists.
        for (let id of courseIds) {
            Course.findOneOrFail(id);
        }

        return await getConnection()
            .getRepository(StaffRequest)
            .createQueryBuilder("staffRequest")
            .innerJoinAndSelect("staffRequest.session", "session")
            .innerJoinAndSelect("session.sessionStream", "sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where("timetable.courseId IN (:...courseIds)", { courseIds })
            .getMany();
    }

    // Needs testing. Only pass in values that needs changing.
    @Mutation(() => StaffRequest)
    async editExistingRequest(
        @Arg("requestDetails", () => EditRequestFormInputType)
        {
            title,
            preferences,
            duration,
            description,
            sessionId,
            requestId,
            closeRequest,
        }: EditRequestFormInputType
    ): Promise<StaffRequest> {
        const request = await StaffRequest.findOneOrFail({ id: requestId });

        if (closeRequest) {
            request.status = RequestStatus.CLOSED;
            return request.save();
        }

        // I think there is a better way to implement this.
        if (sessionId) {
            const session = await Session.findOneOrFail({ id: sessionId });
            request.session = session;
        }
        if (preferences) {
            // Checks to make sure each session id exists.
            let swapPreference: Array<Session> = [];
            for (let sid of preferences) {
                swapPreference.push(await Session.findOneOrFail({ id: sid }));
            }
            request.swapPreference = swapPreference;
        }
        if (title) {
            request.title = title;
        }
        if (duration) {
            request.type = duration;
        }
        if (description) {
            request.description = description;
        }
        return request.save();
    }
}
