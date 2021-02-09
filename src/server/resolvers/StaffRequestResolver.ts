import {
    ArrayNotEmpty,
    ArrayUnique,
    IsNotEmpty,
    IsString,
} from "class-validator";
import {
    Arg,
    Args,
    Ctx,
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
import { MyContext } from "../types/context";

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
    termId: number;

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
            sessionId,
            termId,
        }: RequestFormInputType,
        @Ctx() { req }: MyContext
    ): Promise<StaffRequest> {
        const requester = await User.findOneOrFail(req.user);
        const session = await Session.findOneOrFail({ id: sessionId });
        const userSessions = await SessionAllocation.find(req.user);
        const userSessionStream = await SessionStream.findOneOrFail({
            id: session.sessionStreamId,
        });
        // Ensures session is for a valid timetable and session is for the current term.
        await Timetable.findOneOrFail({
            id: userSessionStream.timetableId,
            termId: termId,
        });

        // Checks if user is in session.
        if (
            (await SessionAllocation.find({ sessionId, user: req.user }))
                .length === 0
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
            const sessionStreamQuery = await SessionStream.findOneOrFail({
                id: sessionQuery.sessionStreamId,
            });
            // Checks each preference is for a valid timetable and each preference is for the current term.
            await Timetable.findOneOrFail({
                id: sessionStreamQuery.timetableId,
                termId: termId,
            });
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

    // Used for displaying all requests associated with the user for a given term
    @Query(() => [StaffRequest])
    async getRequestsByUserId(
        @Ctx() { req }: MyContext,
        @Arg("termId", () => Int) termId: number
    ): Promise<StaffRequest[]> {
        return await StaffRequest.find({ requester: req.user });
    }

    // Used for displaying requests on the main requests page.
    // TODO: NEEDS TO MAKE SURE THE CORRECT TERM IS BEING USED.
    @Query(() => [StaffRequest])
    async getRequestsByCourseIds(
        @Arg("courseIds", () => [Int]) courseIds: number[],
        @Arg("termId", () => Int) termId: number
    ): Promise<StaffRequest[]> {
        // Checks each courseId exists and the term provided is correct.
        for (let id of courseIds) {
            await Course.findOneOrFail(id);
            await Timetable.findOneOrFail({ courseId: id, termId: termId });
        }

        return await getConnection()
            .getRepository(StaffRequest)
            .createQueryBuilder("staffRequest")
            .innerJoinAndSelect("staffRequest.session", "session")
            .innerJoinAndSelect("session.sessionStream", "sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where(
                "timetable.courseId IN (:...courseIds) AND timetable.termId =:termId",
                { courseIds, termId }
            )
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

    @Mutation(() => StaffRequest)
    async deleteRequestById(
        @Ctx() { req }: MyContext,
        @Arg("requestId", () => Int) requestId: number
    ): Promise<StaffRequest> {
        const request = await StaffRequest.findOneOrFail({ id: requestId });

        if ((await request.requester) !== req.user) {
            throw new Error("User ID does not match request user ID");
        }

        return await (await request.remove()).save();
    }
}
