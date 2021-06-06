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
import {
    Offer,
    Session,
    SessionStream,
    StaffRequest,
    Timetable,
    User,
} from "../entities";
import { MyContext } from "../types/context";
import { RequestType } from "../types/request";
import { Service } from "typedi";
import { EntityResolver } from "./EntityResolver";
import { OfferStatus } from "../types/offer";
import {
    canAcceptOffer,
    canMarkOfferAwaitingForApproval,
} from "../utils/requests";

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

    @Mutation(() => Offer)
    async acceptOffer(
        @Arg("offerId") offerId: string,
        @Arg("offerSessionSwapId", () => String, { nullable: true })
        offerSessionSwapId: string | null,
        @Ctx() { req }: MyContext
    ): Promise<Offer> {
        const { user } = req;
        const offer = await this.offerModel.getById(offerId, req.user);
        const request = await this.staffRequestModel.getById(
            offer.requestId,
            user
        );
        const requester = await this.userModel.getById(
            request.requesterId,
            user
        );
        const offerMaker = await this.userModel.getById(offer.userId, user);
        const course = await request.getCourse();
        const term = await request.getTerm();
        const timetable = await Timetable.fromCourseTerm(course, term);
        if (canAcceptOffer(request, timetable)) {
            const updatedOffer = await this.offerModel.update(
                { id: offerId },
                {
                    status: OfferStatus.ACCEPTED,
                    acceptedSessionId:
                        offerSessionSwapId || offer.acceptedSessionId,
                },
                user
            );
            // Allocate offer maker to session
            const requestedSession = await this.sessionModel.getById(
                request.sessionId,
                user
            );
            await this.performSwap(
                requestedSession,
                offerMaker,
                requester,
                user
            );
            // Allocate user to swapped session on offer
            if (offerSessionSwapId) {
                const swapSession = await this.sessionModel.getById(
                    offerSessionSwapId,
                    user
                );
                await this.performSwap(
                    swapSession,
                    requester,
                    offerMaker,
                    user
                );
            }
            // Change all subsequent sessions if request is permanent
            if (request.type === RequestType.PERMANENT) {
                const subsequentSessions = await requestedSession.subsequentSessions();
                for (const subsequentSession of subsequentSessions) {
                    await this.performSwap(
                        subsequentSession,
                        offerMaker,
                        requester,
                        user
                    );
                }
                const stream = await this.streamModel.getById(
                    requestedSession.sessionStreamId,
                    user
                );
                await this.performStreamSwap(
                    stream,
                    offerMaker,
                    requester,
                    user
                );
                if (offerSessionSwapId) {
                    const swapSession = await this.sessionModel.getById(
                        offerSessionSwapId,
                        user
                    );
                    const toSwaps = await swapSession.subsequentSessions();
                    for (const toSwap of toSwaps) {
                        await this.performSwap(
                            toSwap,
                            requester,
                            offerMaker,
                            user
                        );
                    }
                    const stream = await this.streamModel.getById(
                        swapSession.sessionStreamId,
                        user
                    );
                    await this.performStreamSwap(
                        stream,
                        requester,
                        offerMaker,
                        user
                    );
                }
            }
            // After accepting an offer, set all other offers to rejected
            const otherOfferIds = request.offerIds.filter(
                (id) => id !== offerId
            );
            const otherOffers = await this.offerModel.getByIds(
                otherOfferIds,
                user
            );
            for (const otherOffer of otherOffers) {
                await this.offerModel.update(
                    otherOffer,
                    { status: OfferStatus.REJECTED },
                    user
                );
            }
            return updatedOffer;
        } else if (canMarkOfferAwaitingForApproval(request, timetable)) {
            return await this.offerModel.update(
                { id: offerId },
                {
                    status: OfferStatus.AWAITING_APPROVAL,
                    acceptedSessionId: offerSessionSwapId,
                },
                req.user
            );
        }
        throw new Error("Something went wrong");
    }

    private async performSwap(
        session: Session,
        toAllocate: User,
        toDeallocate: User,
        performer: User
    ): Promise<void> {
        await this.sessionModel.allocateSingle(session, toAllocate, performer);
        await this.sessionModel.deallocateSingle(
            session,
            toDeallocate,
            performer
        );
    }

    private async performStreamSwap(
        session: SessionStream,
        toAllocate: User,
        toDeallocate: User,
        performer: User
    ): Promise<void> {
        await this.streamModel.allocateSingle(session, toAllocate, performer);
        await this.streamModel.deallocateSingle(
            session,
            toDeallocate,
            performer
        );
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

    @FieldResolver(() => [Session])
    async preferences(
        @Root() root: Offer,
        @Ctx() { req }: MyContext
    ): Promise<Session[]> {
        return this.sessionModel.getByIds(root.preferenceSessionIds, req.user);
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
