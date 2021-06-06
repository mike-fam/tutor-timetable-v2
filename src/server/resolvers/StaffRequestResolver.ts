import {
    ArrayNotEmpty,
    ArrayUnique,
    IsNotEmpty,
    IsString,
} from "class-validator";
import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { In } from "typeorm";
import { RequestStatus, RequestType } from "../types/request";
import {
    Session,
    SessionAllocation,
    SessionStream,
    StaffRequest,
    Timetable,
    User,
} from "../entities";
import { MyContext } from "../types/context";
import { EntityResolver } from "./EntityResolver";

@InputType()
class RequestFormInputType {
    @Field()
    @IsNotEmpty()
    title: string;

    // Sessions the user wants to switch into.
    @Field(() => [String])
    @ArrayUnique()
    preferences: string[];

    @Field(() => RequestType)
    duration: RequestType;

    @Field({ nullable: true })
    @IsString()
    description: string;

    @Field()
    termId: string;

    // Session user wants to switch out of.
    @Field()
    sessionId: string;
}

@InputType()
class EditRequestFormInputType {
    @Field()
    requestId: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    title: string;

    // Sessions the user wants to switch into.
    @Field(() => [Int], { nullable: true })
    @ArrayNotEmpty()
    @ArrayUnique()
    preferences: string[];

    @Field(() => RequestType, { nullable: true })
    @IsNotEmpty()
    duration: RequestType;

    @Field({ nullable: true })
    @IsString()
    description: string;

    // Session user wants to switch out of.
    @Field({ nullable: true })
    sessionId: string;

    @Field(() => Boolean)
    closeRequest: boolean;
}

@Resolver(() => StaffRequest)
export class StaffRequestResolver extends EntityResolver {
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
        const requester = req.user!;
        const session = await Session.findOneOrFail({ id: sessionId });
        const userSessions = await requester.sessionAllocations;
        const userSessionStream = await session.sessionStream;
        // Ensures session is for a valid timetable and session is for the current term.
        await Timetable.findOneOrFail({
            id: userSessionStream.timetableId,
            termId: termId,
        });

        // Temporary freeze on permanent requests.
        if (duration === RequestType.PERMANENT) {
            throw new Error("Permanent requests are currently frozen.");
        }

        // Checks if user is in session.
        if (
            (await SessionAllocation.find({ sessionId, userId: requester.id }))
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

        // TODO: optimise db calls
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
                    requesterId: requester.id,
                    sessionId: session.id,
                })
            ).length > 0
        ) {
            throw new Error(
                `You have already made a request for ${userSessionStream.name} on that week`
            );
        }

        const request = StaffRequest.create({
            title,
            description,
            type: duration,
            status: RequestStatus.OPEN,
        });
        request.requester = Promise.resolve(requester);
        request.session = Promise.resolve(session);
        request.swapPreference = Promise.resolve(swapPreference);
        return await request.save();
    }

    // Used for displaying requests in modal.
    @Query(() => StaffRequest)
    async getRequestById(
        @Arg("requestId") requestId: string
    ): Promise<StaffRequest> {
        return await StaffRequest.findOneOrFail({ id: requestId });
    }

    // Used for displaying all requests associated with the user for a given term
    @Query(() => [StaffRequest])
    async getRequestsByUserId(
        @Ctx() { req }: MyContext
    ): Promise<StaffRequest[]> {
        const user = req.user!;
        return await StaffRequest.find({ requester: user });
    }

    // Get all requests related to user given term
    // TODO: NEEDS TO MAKE SURE THE CORRECT TERM IS BEING USED.
    @Query(() => [StaffRequest])
    async getRequestsByTermId(
        @Arg("termId") termId: string,
        @Ctx() { req }: MyContext
    ): Promise<StaffRequest[]> {
        const myCourseStaffs = await req.user!.courseStaffs;
        const myTimetables = await Timetable.find({
            id: In(
                myCourseStaffs.map((courseStaff) => courseStaff.timetableId)
            ),
            termId,
        });
        const sessionStreams = await SessionStream.find({
            timetableId: In(myTimetables.map((timetable) => timetable.id)),
        });
        const sessions = await Session.find({
            sessionStreamId: In(
                sessionStreams.map((sessionStream) => sessionStream.id)
            ),
        });
        return await StaffRequest.find({
            sessionId: In(sessions.map((session) => session.id)),
        });
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
            for (const sid of preferences) {
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

    @Mutation(() => String)
    async deleteRequestById(
        @Ctx() { req }: MyContext,
        @Arg("requestId") requestId: string
    ): Promise<string> {
        const request = await StaffRequest.findOneOrFail({ id: requestId });
        const user = req.user!;

        if ((await request.requester).id !== user.id) {
            throw new Error("User ID does not match request user ID");
        }
        const id = request.id;
        await request.remove();
        return id;
    }

    @FieldResolver(() => User)
    async requester(
        @Root() root: StaffRequest,
        @Ctx() { req }: MyContext
    ): Promise<User> {
        return await this.userModel.getById(root.requesterId, req.user);
    }
}
