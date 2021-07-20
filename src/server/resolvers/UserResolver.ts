import { IsEmail, IsNotEmpty } from "class-validator";
import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import {
    CourseStaff,
    Offer,
    StaffRequest,
    Timeslot,
    User,
    UserSettings,
} from "../entities";
import { MyContext } from "../types/context";
import { CourseTermIdInput } from "./CourseTermId";
import { v4 as uuid } from "uuid";
import { Role } from "../types/user";

@InputType()
export class UpdateDetailsInputType {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    name: string;
}

@InputType()
export class UserTimetableInput extends CourseTermIdInput {}

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    async me(@Ctx() { req }: MyContext): Promise<User> {
        return req.user;
    }

    @Mutation(() => User)
    async updateDetails(
        @Ctx() { req, models }: MyContext,
        @Arg("details") { name, email }: UpdateDetailsInputType
    ): Promise<User> {
        return await models.user.update(req.user, { name, email }, req.user);
    }

    @FieldResolver(() => [CourseStaff])
    async courseStaffs(
        @Root() root: User,
        @Ctx() { req, models }: MyContext
    ): Promise<CourseStaff[]> {
        if (!root.isAdmin) {
            return await models.courseStaff.getByIds(
                root.courseStaffIds,
                req.user
            );
        }
        const adminCourseStaffs = CourseStaff.create(
            (await models.timetable.getMany({}, root)).map((timetable) => ({
                id: uuid(),
                timetableId: timetable.id,
                role: Role.COURSE_COORDINATOR,
                userId: root.id,
            }))
        );
        return adminCourseStaffs;
    }

    @FieldResolver(() => [StaffRequest])
    async requests(
        @Root() root: User,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest[]> {
        return await models.staffRequest.getByIds(root.requestIds, req.user);
    }

    @FieldResolver(() => [Timeslot])
    async availabilities(
        @Root() root: User,
        @Ctx() { req, models }: MyContext
    ): Promise<Timeslot[]> {
        return await models.timeslot.getByIds(root.timeslotIds, req.user);
    }

    @FieldResolver(() => [Offer])
    async offers(
        @Root() root: User,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer[]> {
        return await models.offer.getByIds(root.offerIds, req.user);
    }

    @FieldResolver(() => UserSettings)
    async settings(
        @Root() root: User,
        @Ctx() { req, models }: MyContext
    ): Promise<UserSettings> {
        return await models.userSettings.getById(root.settingsId, req.user);
    }
}
