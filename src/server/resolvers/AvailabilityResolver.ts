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
import { Timeslot } from "../entities";
import { MyContext } from "../../types/context";
import { IsoDay } from "../../types/date";
import { getConnection } from "typeorm";

@InputType()
class TimeslotInput {
    @Field()
    startTime: number;

    @Field()
    endTime: number;

    @Field(() => Int)
    day: IsoDay;
}

@InputType()
class TimeslotInputWithId {
    @Field(() => Int)
    id: number;

    @Field({ nullable: true })
    startTime?: number;

    @Field({ nullable: true })
    endTime?: number;

    @Field(() => Int, { nullable: true })
    day?: IsoDay;
}

@Resolver()
export class AvailabilityResolver {
    @Query(() => [Timeslot])
    async myAvailability(@Ctx() ctx: MyContext): Promise<Timeslot[]> {
        return Timeslot.find({ user: ctx.req.user });
    }

    @Mutation(() => [Timeslot])
    async addAvailabilities(
        @Ctx() ctx: MyContext,
        @Arg("timeslots", () => [TimeslotInput]) timeslots: TimeslotInput[]
    ): Promise<Timeslot[]> {
        const newTimeslots = Timeslot.create(
            timeslots.map((timeslot) => ({
                ...timeslot,
                user: ctx.req.user,
            }))
        );
        return await Timeslot.save(newTimeslots);
    }

    @Mutation(() => [Timeslot])
    async updateAvailabilities(
        @Arg("timeslots", () => [TimeslotInputWithId])
        timeslots: TimeslotInputWithId[]
    ): Promise<Timeslot[]> {
        await getConnection().getRepository(Timeslot).save(timeslots);
        return await Timeslot.findByIds(
            timeslots.map((timeslot) => timeslot.id)
        );
    }
}
