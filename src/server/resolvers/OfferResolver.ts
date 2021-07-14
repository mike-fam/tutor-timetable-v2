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

import { OfferStatus } from "../types/offer";
import {
    canAcceptOffer,
    canMarkOfferAwaitingForApproval,
} from "../utils/requests";
import { SessionModel } from "../models/SessionModel";
import { SessionStreamModel } from "../models/SessionStreamModel";

@InputType()
class OfferInputType {
    @Field()
    @IsNotEmpty()
    requestId: string;

    @Field(() => [String], { nullable: true })
    @ArrayUnique()
    sessionPreferences: string[];

    @Field()
    mustSwap: boolean;
}

@InputType()
class EditOfferInputType {
    @Field()
    offerId: string;

    @Field(() => [Int])
    sessionPreferences: string[];
}

@Resolver(() => Offer)
export class OfferResolver {
    @Mutation(() => Offer)
    async createOffer(
        @Arg("offerDetails", () => OfferInputType)
        { requestId, sessionPreferences, mustSwap }: OfferInputType,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer> {
        return await models.offer.create(
            {
                requestId,
                preferenceSessionIds: sessionPreferences,
                mustSwap,
                user: req.user,
            },
            req.user
        );
    }

    @Query(() => Offer)
    async getOfferById(
        @Arg("offerId") offerId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer> {
        return await models.offer.getById(offerId, req.user);
    }

    @Query(() => [Offer])
    async getOffersByRequestId(
        @Arg("requestId") requestId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer[]> {
        return await models.offer.getMany({ requestId }, req.user);
    }

    @Mutation(() => Offer)
    async editExistingOffer(
        @Arg("editDetails", () => EditOfferInputType)
        { offerId, sessionPreferences }: EditOfferInputType,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer> {
        return await models.offer.update(
            { id: offerId },
            { preferenceSessionIds: sessionPreferences },
            req.user
        );
    }

    @Mutation(() => Offer)
    async removeOffer(
        @Arg("offerId") offerId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer> {
        return await models.offer.delete({ id: offerId }, req.user);
    }

    @Mutation(() => Offer)
    async acceptOffer(
        @Arg("offerId") offerId: string,
        @Arg("offerSessionSwapId", () => String, { nullable: true })
        offerSessionSwapId: string | null,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer> {
        const { user } = req;
        const offer = await models.offer.getById(offerId, req.user);
        const request = await models.staffRequest.getById(
            offer.requestId,
            user
        );
        const requester = await models.user.getById(request.requesterId, user);
        const offerMaker = await models.user.getById(offer.userId, user);
        const course = await request.getCourse();
        const term = await request.getTerm();
        const timetable = await Timetable.fromCourseTerm(course, term);
        if (canAcceptOffer(request, timetable)) {
            const updatedOffer = await models.offer.update(
                { id: offerId },
                {
                    status: OfferStatus.ACCEPTED,
                    acceptedSessionId:
                        offerSessionSwapId || offer.acceptedSessionId,
                },
                user
            );
            // Allocate offer maker to session
            const requestedSession = await models.session.getById(
                request.sessionId,
                user
            );
            await OfferResolver.performSwap(
                models.session,
                requestedSession,
                offerMaker,
                requester,
                user
            );
            // Allocate user to swapped session on offer
            if (offerSessionSwapId) {
                const swapSession = await models.session.getById(
                    offerSessionSwapId,
                    user
                );
                await OfferResolver.performSwap(
                    models.session,
                    swapSession,
                    requester,
                    offerMaker,
                    user
                );
            }
            // Change all subsequent sessions if request is permanent
            if (request.type === RequestType.PERMANENT) {
                const subsequentSessions =
                    await requestedSession.subsequentSessions();
                for (const subsequentSession of subsequentSessions) {
                    await OfferResolver.performSwap(
                        models.session,
                        subsequentSession,
                        offerMaker,
                        requester,
                        user
                    );
                }
                const stream = await models.sessionStream.getById(
                    requestedSession.sessionStreamId,
                    user
                );
                await OfferResolver.performStreamSwap(
                    models.sessionStream,
                    stream,
                    offerMaker,
                    requester,
                    user
                );
                if (offerSessionSwapId) {
                    const swapSession = await models.session.getById(
                        offerSessionSwapId,
                        user
                    );
                    const toSwaps = await swapSession.subsequentSessions();
                    for (const toSwap of toSwaps) {
                        await OfferResolver.performSwap(
                            models.session,
                            toSwap,
                            requester,
                            offerMaker,
                            user
                        );
                    }
                    const stream = await models.sessionStream.getById(
                        swapSession.sessionStreamId,
                        user
                    );
                    await OfferResolver.performStreamSwap(
                        models.sessionStream,
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
            const otherOffers = await models.offer.getByIds(
                otherOfferIds,
                user
            );
            for (const otherOffer of otherOffers) {
                await models.offer.update(
                    otherOffer,
                    { status: OfferStatus.REJECTED },
                    user
                );
            }
            return updatedOffer;
        } else if (canMarkOfferAwaitingForApproval(request, timetable)) {
            return await models.offer.update(
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

    private static async performSwap(
        sessionModel: SessionModel,
        session: Session,
        toAllocate: User,
        toDeallocate: User,
        performer: User
    ): Promise<void> {
        await sessionModel.allocateSingleFromOffer(session, toAllocate, performer);
        await sessionModel.deallocateSingleFromOffer(session, toDeallocate, performer);
    }

    private static async performStreamSwap(
        streamModel: SessionStreamModel,
        session: SessionStream,
        toAllocate: User,
        toDeallocate: User,
        performer: User
    ): Promise<void> {
        await streamModel.allocateSingleFromOffer(session, toAllocate, performer);
        await streamModel.deallocateSingleFromOffer(session, toDeallocate, performer);
    }

    @FieldResolver(() => StaffRequest)
    async request(
        @Root() root: Offer,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest> {
        return models.staffRequest.getById(root.requestId, req.user);
    }

    @FieldResolver(() => User)
    async user(
        @Root() root: Offer,
        @Ctx() { req, models }: MyContext
    ): Promise<User> {
        return models.user.getById(root.userId, req.user);
    }

    @FieldResolver(() => [Session])
    async preferences(
        @Root() root: Offer,
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        return models.session.getByIds(root.preferenceSessionIds, req.user);
    }

    @FieldResolver(() => Session, { nullable: true })
    async acceptedSession(
        @Root() root: Offer,
        @Ctx() { req, models }: MyContext
    ): Promise<Session | null> {
        if (!root.acceptedSessionId) {
            return null;
        }
        return models.session.getById(root.acceptedSessionId, req.user);
    }
}
