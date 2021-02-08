import { ArrayNotEmpty, ArrayUnique, IsNotEmpty } from "class-validator";
import { Arg, Field, InputType, Int, Mutation, Resolver } from "type-graphql";
import { Offer, Session, StaffRequest, User } from "../entities";

@InputType()
class OfferInputType {
    @Field(() => Int)
    @IsNotEmpty()
    userId: number;

    @Field(() => Int)
    @IsNotEmpty()
    requestId: number;

    @Field(() => [Int])
    @ArrayUnique()
    @ArrayNotEmpty()
    sessionPreferences: number[];
}

@Resolver()
export class OfferResolver {
    @Mutation(() => Offer)
    async createOffer(
        @Arg("offerDetails", () => OfferInputType)
        { userId, requestId, sessionPreferences }: OfferInputType
    ): Promise<Offer> {
        const user = await User.findOneOrFail({ id: userId });
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
}
