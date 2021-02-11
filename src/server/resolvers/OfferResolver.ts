import {
    ArrayNotEmpty,
    ArrayUnique,
    IsNotEmpty,
    IsOptional,
} from "class-validator";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
} from "type-graphql";
import { In, MoreThanOrEqual } from "typeorm";
import {
    Offer,
    Session,
    SessionAllocation,
    StaffRequest,
    StreamAllocation,
    User,
} from "../entities";
import { MyContext } from "../types/context";
import { RequestStatus, RequestType } from "../types/request";

@InputType()
class OfferInputType {
    @Field(() => Int)
    @IsNotEmpty()
    requestId: number;

    @Field(() => [Int], { nullable: true })
    @ArrayUnique()
    @IsOptional()
    @ArrayNotEmpty()
    sessionPreferences: number[];
}

@InputType()
class EditOfferInputType {
    @Field(() => Int)
    offerId: number;

    @Field(() => [Int])
    sessionPreferences: number[];
}

@Resolver()
export class OfferResolver {
    @Mutation(() => Offer)
    async createOffer(
        @Arg("offerDetails", () => OfferInputType)
        { requestId, sessionPreferences }: OfferInputType,
        @Ctx() { req }: MyContext
    ): Promise<Offer> {
        const user = await User.findOneOrFail(req.user);
        const request = await StaffRequest.findOneOrFail({ id: requestId });

        const isOfferUnique =
            (await Offer.find({ user, request })).length > 0 ? false : true;

        if (!isOfferUnique) {
            throw new Error(
                "You cannot make multiple offers for the same request"
            );
        }

        let preferredSessions: Array<Session> = [];
        if (sessionPreferences) {
            const requestPreferenceIds = (await request.swapPreference).filter(
                (session) => !sessionPreferences.includes(session.id)
            );
            if (requestPreferenceIds.length > 0) {
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
    async getOfferById(
        @Arg("offerId", () => Int) offerId: number
    ): Promise<Offer> {
        const offer = await Offer.findOneOrFail({ id: offerId });
        return offer;
    }

    @Query(() => [Offer])
    async getOffersByRequestId(
        @Arg("requestId", () => Int) requestId: number
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
        for (let sid of sessionPreferences) {
            const session = await Session.findOneOrFail({ id: sid });
            preferredSessions.push(session);
        }

        offer.preferences = preferredSessions;
        return offer.save();
    }

    // TODO
    @Mutation(() => Offer)
    async removeOffer(
        @Arg("offerId", () => Int) offerId: number,
        @Ctx() { req }: MyContext
    ): Promise<Offer> {
        const offer = await Offer.findOneOrFail({ id: offerId });
        const user = await User.findOneOrFail(req.user);
        if (user.id !== (await offer.user).id) {
            throw new Error("User ID does not match offer user ID.");
        }

        return await offer.remove();
    }

    @Mutation(() => Offer)
    async acceptOffer(
        @Arg("offerId", () => Int) offerId: number,
        @Arg("requestId", () => Int) requestId: number,
        @Arg("offerSessionSwapId", () => Int, { nullable: true })
        offerSessionSwapId: number,
        @Ctx() { req }: MyContext
    ): Promise<Offer> {
        // User
        const user = req.user!;
        // Request
        const request = await StaffRequest.findOneOrFail({ id: requestId });
        // Offer
        const offer = await Offer.findOneOrFail({ id: offerId });
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

        if (user.id !== (await request.requester).id) {
            throw new Error("User ID does not match with request user ID");
        }

        if (request.type === RequestType.TEMPORARY) {
            // Switch offerer into requester session.
            const requesterSessionAlloc = await SessionAllocation.findOneOrFail(
                {
                    id: requestedSession.id,
                    userId: user.id,
                }
            );
            requesterSessionAlloc.userId = offerUser.id;
            await requesterSessionAlloc.save();

            // If swap preferences were provided in the offer.
            if (offerPrefs.length > 0 && offerSession) {
                // Switch requester into offered session.
                const offererSessionAlloc = await SessionAllocation.findOneOrFail(
                    {
                        sessionId: offerSession.id,
                        userId: offerUser.id,
                    }
                );
                offererSessionAlloc.userId = user.id;
                await offererSessionAlloc.save();
            }
            request.acceptor = offerUser;
            request.status = RequestStatus.CLOSED;
            await request.save();
        } else if (request.type === RequestType.PERMANENT) {
            // Change stream allocation for offerer.
            const requesterStreamAlloc = await StreamAllocation.findOneOrFail({
                userId: user.id,
                sessionStreamId: requestedSession.id,
            });
            requesterStreamAlloc.userId = offerUser.id;
            await requesterStreamAlloc.save();

            // Change all session allocations from specified week onwards.
            const startWeek = requestedSession.week;

            // Get all session IDs for weeks after starting week.
            const sessionsToSwitchInto = (
                await Session.find({
                    sessionStreamId: requestedSession.sessionStreamId,
                    week: MoreThanOrEqual(startWeek),
                })
            ).map((item) => item.id);

            // Get all session allocations of requester.
            const sessionAllocs = await SessionAllocation.find({
                userId: user.id,
                sessionId: In(sessionsToSwitchInto),
            });

            // Change all session allocations from requester to accepter.
            for (let alloc of sessionAllocs) {
                alloc.userId = offerUser.id;
                await alloc.save();
            }

            // For swaps
            if (offerPrefs.length > 0 && offerSession) {
                // Change stream allocation for requester
                const offerStreamAlloc = await StreamAllocation.findOneOrFail({
                    userId: offerUser.id,
                    sessionStreamId: offerSession.id,
                });
                offerStreamAlloc.userId = user.id;
                offerStreamAlloc.save();

                // Get week of the starting session
                const startWeek = offerSession.week;

                // Get all session IDs from start week onwards.
                const sessionsToSwitchInto = (
                    await Session.find({
                        sessionStreamId: offerSession.sessionStreamId,
                        week: MoreThanOrEqual(startWeek),
                    })
                ).map((item) => item.id);

                // Get all session allocations of offerer.
                const sessionAllocs = await SessionAllocation.find({
                    userId: offerUser.id,
                    sessionId: In(sessionsToSwitchInto),
                });

                // Change all session allocations from requester to accepter.
                for (let alloc of sessionAllocs) {
                    alloc.userId = user.id;
                    await alloc.save();
                }
            }
            request.acceptor = offerUser;
            request.status = RequestStatus.CLOSED;
            await request.save();
        }

        throw new Error("Something went wrong.");
    }
}
