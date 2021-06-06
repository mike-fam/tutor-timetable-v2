import { ArrayUnique, IsNotEmpty } from "class-validator";
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
import { In, MoreThanOrEqual } from "typeorm";
import {
    Offer,
    Preference,
    Session,
    SessionAllocation,
    StaffRequest,
    StreamAllocation,
    User,
} from "../entities";
import { MyContext } from "../types/context";
import { RequestStatus, RequestType } from "../types/request";
import { Service } from "typedi";
import { EntityResolver } from "./EntityResolver";

@InputType()
class OfferInputType {
    @Field()
    @IsNotEmpty()
    requestId: string;

    @Field(() => [String], { nullable: true })
    @ArrayUnique()
    sessionPreferences: string[];
}

@InputType()
class EditOfferInputType {
    @Field()
    offerId: string;

    @Field(() => [Int])
    sessionPreferences: string[];
}

@Service()
@Resolver(() => Offer)
export class OfferResolver extends EntityResolver {
    @Mutation(() => Offer)
    async createOffer(
        @Arg("offerDetails", () => OfferInputType)
        { requestId, sessionPreferences }: OfferInputType,
        @Ctx() { req }: MyContext
    ): Promise<Offer> {
        const user = await User.findOneOrFail(req.user);
        const request = await StaffRequest.findOneOrFail({ id: requestId });

        // Freeze permanent requests.
        if (request.type === RequestType.PERMANENT) {
            throw new Error("Permanent requests are currently frozen.");
        }

        if ((await request.requester).id === user.id) {
            throw new Error("You cannot create an offer for a request you own");
        }

        const isOfferUnique = (await Offer.find({ user, request })).length <= 0;

        if (!isOfferUnique) {
            throw new Error(
                "You cannot make multiple offers for the same request"
            );
        }

        let preferredSessions: Array<Session> = [];
        if (sessionPreferences.length > 0) {
            const requestPreferenceIds = (
                await request.swapPreference
            ).filter((session) => sessionPreferences.includes(session.id));
            if (requestPreferenceIds.length === 0) {
                throw new Error(
                    "One or more preferences are not in the requested sessions."
                );
            }
            for (let sid of sessionPreferences) {
                const session = await Session.findOneOrFail({ id: sid });
                preferredSessions.push(session);
            }
        }

        const newOffer = Offer.create({
            user,
            request,
        });

        if (preferredSessions.length > 0) {
            newOffer.preferences = preferredSessions;
        }

        return await newOffer.save();
    }

    @Query(() => Offer)
    async getOfferById(@Arg("offerId") offerId: string): Promise<Offer> {
        const offer = await Offer.findOneOrFail({ id: offerId });
        return offer;
    }

    @Query(() => [Offer])
    async getOffersByRequestId(
        @Arg("requestId") requestId: string
    ): Promise<Offer[]> {
        const request = await StaffRequest.findOneOrFail({ id: requestId });
        return await Offer.find({ request });
    }

    @Mutation(() => Offer)
    async editExistingOffer(
        @Arg("editDetails", () => EditOfferInputType)
        { offerId, sessionPreferences }: EditOfferInputType
    ): Promise<Offer> {
        const offer = await Offer.findOneOrFail({ id: offerId });

        let preferredSessions: Array<Session> = [];
        for (const sid of sessionPreferences) {
            const session = await Session.findOneOrFail({ id: sid });
            preferredSessions.push(session);
        }

        offer.preferences = preferredSessions;
        return offer.save();
    }

    // TODO
    @Mutation(() => Offer)
    async removeOffer(
        @Arg("offerId") offerId: string,
        @Ctx() { req }: MyContext
    ): Promise<Offer> {
        const offer = await Offer.findOneOrFail({ id: offerId });
        const user = await User.findOneOrFail(req.user);
        if (user.id !== (await offer.user).id) {
            throw new Error("User ID does not match offer user ID.");
        }

        return await offer.remove();
    }

    @Mutation(() => Boolean)
    async acceptOffer(
        @Arg("offerId") offerId: string,
        @Arg("offerSessionSwapId", { nullable: true })
        offerSessionSwapId: string,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        // User
        const user = req.user!;
        // Offer
        const offer = await Offer.findOneOrFail({ id: offerId });
        // Request
        const request = await offer.request;
        // Use who made the offer
        const offerUser = await offer.user;
        // Preferences of the offer made. Empty array if no preferences
        const offerPrefs = await offer.preferences;
        // Session requested by the requester
        const requestedSession = await request.session;
        // Session requester switches into if provided
        const offerSession = await Session.findOne({
            id: offerSessionSwapId,
        });

        // Freeze permanent requests.
        if (request.type === RequestType.PERMANENT) {
            throw new Error("Permanent requests are currently frozen.");
        }

        if (user.id !== (await request.requester).id) {
            throw new Error("User ID does not match with request user ID");
        }

        if (request.status === RequestStatus.CLOSED) {
            throw new Error("This request is closed");
        }

        if (offerPrefs.length > 0) {
            if (offerSessionSwapId === null) {
                throw new Error("You must provide a session preference");
            }
            if (
                !offerPrefs.map((item) => item.id).includes(offerSessionSwapId)
            ) {
                throw new Error("session provided must be in the preferences");
            }
        }

        if (request.type === RequestType.TEMPORARY) {
            switchUserIntoSessionAllocation(
                offerUser,
                [requestedSession.id],
                user
            );

            // If swap preferences were provided in the offer.
            if (offerPrefs.length > 0 && offerSession) {
                switchUserIntoSessionAllocation(
                    user,
                    [offerSession.id],
                    offerUser
                );
            }
            acceptOfferCleanUp(request, offerUser);
            return true;
        } else if (request.type === RequestType.PERMANENT) {
            // Change stream allocation for offerer.
            const requesterStreamAlloc = await StreamAllocation.findOneOrFail({
                userId: user.id,
                sessionStreamId: requestedSession.sessionStreamId,
            });
            requesterStreamAlloc.userId = offerUser.id;

            // Change all session allocations from specified week onwards.
            const startWeek = requestedSession.week;

            // Get all session IDs for weeks after starting week.
            const sessionsToSwitchInto = (
                await Session.find({
                    sessionStreamId: requestedSession.sessionStreamId,
                    week: MoreThanOrEqual(startWeek),
                })
            ).map((item) => item.id);

            switchUserIntoSessionAllocation(
                offerUser,
                sessionsToSwitchInto,
                user
            );

            // For swaps
            if (offerPrefs.length > 0 && offerSession) {
                // Change stream allocation for requester
                const offerStreamAlloc = await StreamAllocation.findOneOrFail({
                    userId: offerUser.id,
                    sessionStreamId: offerSession.sessionStreamId,
                });
                offerStreamAlloc.userId = user.id;

                // Get week of the starting session
                const startWeek = offerSession.week;

                // Get all session IDs from start week onwards.
                const sessionsToSwitchInto = (
                    await Session.find({
                        sessionStreamId: offerSession.sessionStreamId,
                        week: MoreThanOrEqual(startWeek),
                    })
                ).map((item) => item.id);

                switchUserIntoSessionAllocation(
                    user,
                    sessionsToSwitchInto,
                    offerUser
                );
                await offerStreamAlloc.save();
            }
            await requesterStreamAlloc.save();
            await acceptOfferCleanUp(request, offerUser);
            return true;
        }

        throw new Error("Something went wrong.");
    }

    @FieldResolver(() => StaffRequest)
    async request(
        @Root() root: Offer,
        @Ctx() { req }: MyContext
    ): Promise<StaffRequest> {
        return this.staffRequestModel.getById(root.requestId, req.user);
    }

    @FieldResolver(() => User)
    async user(@Root() root: Offer, @Ctx() { req }: MyContext): Promise<User> {
        return this.userModel.getById(root.userId, req.user);
    }

    @FieldResolver(() => [Preference])
    async preferences(
        @Root() root: Offer,
        @Ctx() { req }: MyContext
    ): Promise<Preference[]> {
        return this.preferenceModel.getByIds(
            root.preferenceSessionIds,
            req.user
        );
    }

    @FieldResolver(() => Session, { nullable: true })
    async acceptedSession(
        @Root() root: Offer,
        @Ctx() { req }: MyContext
    ): Promise<Session | null> {
        if (!root.acceptedSessionId) {
            return null;
        }
        return this.sessionModel.getById(root.acceptedSessionId, req.user);
    }
}

// User refers to the person switching into the session.
// sessionUser refers to the user that is having their session switched into.
const switchUserIntoSessionAllocation = async (
    user: User,
    sessionsToSwitchInto: Array<string>,
    sessionUser: User
): Promise<SessionAllocation[]> => {
    const sessionAllocs = await SessionAllocation.find({
        userId: sessionUser.id,
        sessionId: In(sessionsToSwitchInto),
    });

    if (sessionAllocs.length === 0) {
        throw new Error("No sessions were found for " + sessionUser.username);
    }

    for (let alloc of sessionAllocs) {
        alloc.userId = user.id;
        await alloc.save();
    }

    return sessionAllocs;
};

const acceptOfferCleanUp = async (
    request: StaffRequest,
    acceptor: User
): Promise<StaffRequest> => {
    // request.acceptor = acceptor;
    request.status = RequestStatus.CLOSED;
    await request.save();

    const offers = await Offer.find({ request: request });
    offers.forEach(async (item) => await item.remove());

    return request;
};
