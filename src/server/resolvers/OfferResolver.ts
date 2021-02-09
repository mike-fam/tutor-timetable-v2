import { ArrayNotEmpty, ArrayUnique, IsNotEmpty } from "class-validator";
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
import { Offer, Session, StaffRequest, User } from "../entities";
import { MyContext } from "../types/context";

@InputType()
class OfferInputType {
    @Field(() => Int)
    @IsNotEmpty()
    requestId: number;

    @Field(() => [Int])
    @ArrayUnique()
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
        for (let sid of sessionPreferences) {
            const session = await Session.findOneOrFail({ id: sid });
            preferredSessions.push(session);
        }

        const newOffer = Offer.create({
            user,
            request,
        });

        newOffer.preferences = preferredSessions;

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
            throw new Error("You cannot remove someone else's offer.");
        }

        return await offer.remove();
    }
}
