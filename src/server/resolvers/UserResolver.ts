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
import { EntityResolver } from "./EntityResolver";

@InputType()
export class UpdateDetailsInputType {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    name: string;
}

@Service()
@Resolver(() => User)
export class UserResolver extends EntityResolver {
    @Query(() => User)
    async me(@Ctx() { req }: MyContext): Promise<User> {
        return req.user;
    }

    @Mutation(() => User)
    async updateDetails(
        @Ctx() { req }: MyContext,
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
        @Ctx() { req }: MyContext
    ): Promise<CourseStaff[]> {
        return this.courseStaffModel.getByIds(root.courseStaffIds, req.user);
    }

    @FieldResolver(() => [StaffRequest])
    async requests(
        @Root() root: User,
        @Ctx() { req }: MyContext
    ): Promise<StaffRequest[]> {
        return this.staffRequestModel.getByIds(root.requestIds, req.user);
    }

    @FieldResolver(() => [Timeslot])
    async availabilities(
        @Root() root: User,
        @Ctx() { req }: MyContext
    ): Promise<Timeslot[]> {
        return this.timeslotModel.getByIds(root.timeslotIds, req.user);
    }

    @FieldResolver(() => [Offer])
    async offers(
        @Root() root: User,
        @Ctx() { req }: MyContext
    ): Promise<Offer[]> {
        return this.offerModel.getByIds(root.offerIds, req.user);
    }

    @FieldResolver(() => UserSettings)
    async settings(
        @Root() root: User,
        @Ctx() { req }: MyContext
    ): Promise<UserSettings> {
        return this.userSettingsModel.getById(root.settingsId, req.user);
    }
}
