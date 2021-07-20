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
import { Timeslot, User } from "../entities";
import { MyContext } from "../types/context";
import { IsoDay } from "../../types/date";
import { In } from "typeorm";
import { ModificationType } from "../inputs/ModificationType";

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

    @Field(() => ModificationType)
    modificationType: ModificationType;
}

@Resolver(() => Timeslot)
export class AvailabilityResolver {
    @Query(() => [Timeslot])
    async myAvailability(
        @Ctx() { req, models }: MyContext
    ): Promise<Timeslot[]> {
        const user = req.user;
        return await models.timeslot.getMany({ userId: user.id }, user);
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
                    timeslot.modificationType === ModificationType.ADDED
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
                    timeslot.modificationType === ModificationType.MODIFIED
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
                    timeslot.modificationType === ModificationType.REMOVED ||
                    timeslot.modificationType ===
                        ModificationType.REMOVED_MODIFIED
            )
            .map((timeslot) => timeslot.id!);
        await models.timeslot.deleteMany(
            {
                id: In(removedTimeslotIds),
            },
            user
        );
        await models.timeslot.save([...newSessions, ...updatedTimeslots], user);
        return await models.timeslot.getMany({ userId: user.id }, user);
    }

    @FieldResolver(() => User)
    async user(
        @Root() root: Timeslot,
        @Ctx() { req, models }: MyContext
    ): Promise<User> {
        return models.user.getById(root.userId, req.user);
    }
}
