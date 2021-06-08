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
import { Service } from "typedi";

@InputType()
export class UpdateDetailsInputType {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    name: string;
}

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    async me(@Ctx() { req, models }: MyContext): Promise<User> {
        return req.user;
    }

    @Mutation(() => User)
    async updateDetails(
        @Ctx() { req, models }: MyContext,
        @Arg("details") { name, email }: UpdateDetailsInputType
    ): Promise<User> {
        const user = req.user!;
        user.name = name;
        user.email = email;
        return await user.save();
    }

    @FieldResolver(() => [CourseStaff])
    async courseStaffs(
        @Root() root: User,
        @Ctx() { req, models }: MyContext
    ): Promise<CourseStaff[]> {
        return await models.courseStaff.getByIds(root.courseStaffIds, req.user);
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
