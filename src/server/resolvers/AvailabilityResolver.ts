import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    Query,
    registerEnumType,
    Resolver,
    Root,
} from "type-graphql";
import { Timeslot, User } from "../entities";
import { MyContext } from "../types/context";
import { IsoDay } from "../../types/date";
import { In } from "typeorm";
import { Service } from "typedi";

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

@Resolver(() => Timeslot)
export class AvailabilityResolver {
    @Query(() => [Timeslot])
    async myAvailability(
        @Ctx() { req, models }: MyContext
    ): Promise<Timeslot[]> {
        const user = req.user;
        return await models.timeslot.getMany({ user }, user);
    }

    @Mutation(() => [Timeslot])
    async updateAvailabilities(
        @Arg("timeslots", () => [TimeslotInput])
        timeslots: TimeslotInput[],
        @Ctx() { req, models }: MyContext
    ): Promise<Timeslot[]> {
        const user = req.user;
        const newSessions = timeslots
            .filter(
                (timeslot) =>
                    timeslot.modificationType ===
                    AvailabilityModificationType.ADDED
            )
            .map(({ startTime, endTime, day }) => ({
                startTime,
                endTime,
                day,
                user,
            }));
        const updatedTimeslots = timeslots
            .filter(
                (timeslot) =>
                    timeslot.modificationType ===
                    AvailabilityModificationType.MODIFIED
            )
            .map(({ id, startTime, endTime, day }) => ({
                id,
                startTime,
                endTime,
                day,
            }));
        const removedTimeslotIds = timeslots
            .filter(
                (timeslot) =>
                    timeslot.modificationType ===
                        AvailabilityModificationType.REMOVED ||
                    timeslot.modificationType ===
                        AvailabilityModificationType.REMOVED_MODIFIED
            )
            .map((timeslot) => timeslot.id!);
        await models.timeslot.deleteMany(
            {
                id: In(removedTimeslotIds),
            },
            user
        );
        return await models.timeslot.save(
            [...newSessions, ...updatedTimeslots],
            user
        );
    }

    @FieldResolver(() => User)
    async user(
        @Root() root: Timeslot,
        @Ctx() { req, models }: MyContext
    ): Promise<User> {
        return models.user.getById(root.userId, req.user);
    }
}
