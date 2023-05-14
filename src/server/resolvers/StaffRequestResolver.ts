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
import { RequestStatus, RequestType } from "../types/request";
import { Offer, Session, StaffRequest, User } from "../entities";
import { MyContext } from "../types/context";

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
    type: RequestType;

    @Field({ nullable: true })
    @IsString()
    description: string;

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
export class StaffRequestResolver {
    @Mutation(() => StaffRequest)
    async createRequest(
        @Arg("requestDetails", () => RequestFormInputType)
        {
            title,
            preferences,
            type,
            description,
            sessionId,
        }: RequestFormInputType,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest> {
        return await models.staffRequest.create(
            {
                title,
                type,
                description,
                swapPreferenceSessionIds: preferences,
                sessionId,
                status: RequestStatus.OPEN,
            },
            req.user
        );
    }

    // Used for displaying requests in modal.
    @Query(() => StaffRequest)
    async getRequestById(
        @Arg("requestId") requestId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest> {
        return await models.staffRequest.getById(requestId, req.user);
    }

    // Used for displaying all requests associated with the user for a given term
    @Query(() => [StaffRequest])
    async getRequestsByUserId(
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest[]> {
        const user = req.user;
        return await models.staffRequest.getManyBy(
            { requester: { id: user.id } },
            user
        );
    }

    // Get all requests related to user given term
    @Query(() => [StaffRequest])
    async getRequestsByTermId(
        @Arg("termId") termId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest[]> {
        // TODO: check
        return await models.staffRequest.getManyBy(
            {
                session: {
                    sessionStream: {
                        timetable: {
                            termId,
                        },
                    },
                },
            },
            req.user
        );
        // const myCourseStaffs = await req.user!.courseStaffs;
        // const myTimetables = await Timetable.find({
        //     id: In(
        //         myCourseStaffs.map((courseStaff) => courseStaff.timetableId)
        //     ),
        //     termId,
        // });
        // const sessionStreams = await SessionStream.find({
        //     timetableId: In(myTimetables.map((timetable) => timetable.id)),
        // });
        // const sessions = await Session.find({
        //     sessionStreamId: In(
        //         sessionStreams.map((sessionStream) => sessionStream.id)
        //     ),
        // });
        // return await StaffRequest.find({
        //     sessionId: In(sessions.map((session) => session.id)),
        // });
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
        }: EditRequestFormInputType,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest> {
        const user = req.user;
        const request = await models.staffRequest.getById(requestId, user);

        if (closeRequest) {
            return await models.staffRequest.update(
                { id: request.id },
                {
                    status: RequestStatus.CLOSED,
                },
                user
            );
        }

        return await models.staffRequest.update(
            { id: request.id },
            {
                sessionId: sessionId || request.sessionId,
                swapPreferenceSessionIds:
                    preferences || request.swapPreferenceSessionIds,
                title: title || request.title,
                description: description || request.description,
                type: duration || request.type,
            },
            user
        );
        // I think there is a better way to implement this.
        // if (sessionId) {
        //     const session = await Session.findOneOrFail({ id: sessionId });
        //     request.session = session;
        // }
        // if (preferences) {
        //     // Checks to make sure each session id exists.
        //     let swapPreference: Array<Session> = [];
        //     for (const sid of preferences) {
        //         swapPreference.push(await Session.findOneOrFail({ id: sid }));
        //     }
        //     request.swapPreference = swapPreference;
        // }
        // if (title) {
        //     request.title = title;
        // }
        // if (duration) {
        //     request.type = duration;
        // }
        // if (description) {
        //     request.description = description;
        // }
        // return request.save();
    }

    @Mutation(() => String)
    async deleteRequestById(
        @Ctx() { req, models }: MyContext,
        @Arg("requestId") requestId: string
    ): Promise<string> {
        await models.staffRequest.delete({ id: requestId }, req.user);
        return requestId;
        // const request = await StaffRequest.findOneOrFail({ id: requestId });
        // const user = req.user!;
        //
        // if ((await request.requester).id !== user.id) {
        //     throw new Error("User ID does not match request user ID");
        // }
        // const id = request.id;
        // await request.remove();
        // return id;
    }

    @FieldResolver(() => User)
    async requester(
        @Root() root: StaffRequest,
        @Ctx() { req, models }: MyContext
    ): Promise<User> {
        return await models.user.getById(root.requesterId, req.user);
    }

    @FieldResolver(() => User, { nullable: true })
    async finaliser(
        @Root() root: StaffRequest,
        @Ctx() { req, models }: MyContext
    ): Promise<User | null> {
        if (!root.finaliserId) {
            return null;
        }
        return models.user.getById(root.finaliserId, req.user);
    }

    @FieldResolver(() => Session)
    async session(
        @Root() root: StaffRequest,
        @Ctx() { req, models }: MyContext
    ): Promise<Session> {
        return models.session.getById(root.sessionId, req.user);
    }

    @FieldResolver(() => [Session])
    async swapPreference(
        @Root() root: StaffRequest,
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        return models.session.getByIds(root.swapPreferenceSessionIds, req.user);
    }

    @FieldResolver(() => [Offer])
    async offers(
        @Root() root: StaffRequest,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer[]> {
        return models.offer.getByIds(root.offerIds, req.user);
    }
}
