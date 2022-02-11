import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { Timeslot, User } from "../entities";
import { MyContext } from "../types/context";
import { IsoDay } from "../../types/date";
import { In } from "typeorm";
import { ModificationType } from "../inputs/ModificationType";
import { CourseTermIdInput } from "./CourseTermId";

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

@ObjectType()
class StaffEnteredAvailability {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    entered: boolean;
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

    @Query(() => [Timeslot])
    async tutorAvailability(
        @Arg("userId", () => String) userId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Timeslot[]> {
        const user = req.user;
        return await models.timeslot.getMany({ userId: userId }, user);
    }

    @Query(() => [StaffEnteredAvailability])
    async staffWithAvailabilities(
        @Arg("courseTermInput", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffEnteredAvailability[]> {
        const user = req.user;
        const timetable = await models.timetable.get(
            { courseId, termId },
            user
        );
        const staff = await models.courseStaff.getMany(
            { timetableId: timetable.id },
            user
        );
        const result = [];
        for (const staffMember of staff) {
            console.log(staffMember);
            const timeslots = await models.timeslot.getMany(
                { userId: staffMember.userId },
                user
            );
            console.log(timeslots);
            const staff = await staffMember.user;
            result.push({
                id: staffMember.userId,
                name: staff.name,
                entered: timeslots.length > 0,
            });
        }
        return result;
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
