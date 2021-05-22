import {
    Arg,
    Ctx,
    Field,
    InputType,
    Int,
    Mutation,
    Query,
    registerEnumType,
    Resolver,
} from "type-graphql";
import { Timeslot } from "../entities";
import { MyContext } from "../types/context";
import { IsoDay } from "../../types/date";
import { getConnection } from "typeorm";

export enum AvailabilityModificationType {
    UNCHANGED,
    ADDED,
    MODIFIED,
    REMOVED,
    REMOVED_MODIFIED,
}

registerEnumType(AvailabilityModificationType, {
    name: "AvailabilityModificationType",
});

@InputType()
class TimeslotInput {
    @Field()
    id: string;

    @Field()
    startTime: number;

    @Field()
    endTime: number;

    @Field(() => Int)
    day: IsoDay;

    @Field(() => AvailabilityModificationType)
    modificationType: AvailabilityModificationType;
}

@Resolver()
export class AvailabilityResolver {
    @Query(() => [Timeslot])
    async myAvailability(@Ctx() ctx: MyContext): Promise<Timeslot[]> {
        return await Timeslot.find({ user: ctx.req.user });
    }

    @Mutation(() => [Timeslot])
    async updateAvailabilities(
        @Arg("timeslots", () => [TimeslotInput])
        timeslots: TimeslotInput[],
        @Ctx() { req }: MyContext
    ): Promise<Timeslot[]> {
        const newSessions = timeslots
            .filter(
                (timeslot) =>
                    timeslot.modificationType ===
                    AvailabilityModificationType.ADDED
            )
            .map((timeslot) => ({
                startTime: timeslot.startTime,
                endTime: timeslot.endTime,
                day: timeslot.day,
                user: req.user,
            }));
        await Timeslot.save(Timeslot.create(newSessions));
        const removedSessionIds = timeslots
            .filter(
                (timeslot) =>
                    timeslot.modificationType ===
                        AvailabilityModificationType.REMOVED ||
                    timeslot.modificationType ===
                        AvailabilityModificationType.REMOVED_MODIFIED
            )
            .map((timeslot) => timeslot.id);
        if (removedSessionIds.length > 0) {
            await Timeslot.delete(removedSessionIds);
        }
        const updatedTimeslots = timeslots
            .filter(
                (timeslot) =>
                    timeslot.modificationType ===
                    AvailabilityModificationType.MODIFIED
            )
            .map((timeslot) => ({
                id: timeslot.id,
                startTime: timeslot.startTime,
                endTime: timeslot.endTime,
                day: timeslot.day,
            }));
        await getConnection().getRepository(Timeslot).save(updatedTimeslots);
        return await Timeslot.find({ user: req.user });
    }
}
