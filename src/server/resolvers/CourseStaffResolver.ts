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
import { CourseStaff, Preference, Timetable, User } from "../entities";
import { Role } from "../types/user";
import { CourseTermIdInput } from "./CourseTermId";
import { redacted } from "../constants";
import { MyContext } from "../types/context";

@InputType()
export class CourseStaffInput extends CourseTermIdInput {
    @Field(() => Role)
    role: Role;

    @Field(() => Boolean)
    isNew: boolean;
}

@InputType()
export class CourseStaffUserInput extends CourseStaffInput {
    @Field()
    username: string;
}

@Resolver(() => CourseStaff)
export class CourseStaffResolver {
    @Mutation(() => CourseStaff)
    async addCourseStaff(
        @Arg("courseStaffUserInput")
        { courseId, termId, role, isNew, username }: CourseStaffUserInput,
        @Ctx() { req, models }: MyContext
    ): Promise<CourseStaff> {
        const user = req.user;
        const timetable = await models.timetable.get(
            { courseId, termId },
            user
        );
        let newStaff = await models.user.getIfExists({ username }, user);
        if (!newStaff) {
            newStaff = await models.user.create(
                { name: redacted, email: redacted, username },
                user
            );
        }
        const newCourseStaff = await models.courseStaff.create(
            {
                role,
                isNew,
                timetable,
                userId: newStaff.id,
            },
            user
        );
        return newCourseStaff;
    }

    @Query(() => [CourseStaff])
    async courseStaffs(
        @Arg("courseTermInput", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput,
        @Ctx() { req, models }: MyContext
    ): Promise<CourseStaff[]> {
        const user = req.user;
        const timetable = await models.timetable.get(
            { courseId, termId },
            user
        );
        return await models.courseStaff.getMany(
            { timetableId: timetable.id },
            user
        );
    }

    @Mutation(() => [CourseStaff])
    async addUsersToCourse(
        @Arg("courseStaffInput", () => CourseStaffInput)
        { role, isNew, termId, courseId }: CourseStaffInput,
        @Arg("usernames", () => [String]) usernames: string[],
        @Ctx() { req, models }: MyContext
    ): Promise<CourseStaff[]> {
        const user = req.user;
        const timetable = await models.timetable.get(
            { courseId, termId },
            user
        );
        const users = await models.user.getOrCreateUserByUsernames(
            usernames,
            user
        );
        const existingCourseStaff = await models.courseStaff.getMany(
            {
                where: users.map((user) => ({
                    timetableId: timetable.id,
                    userId: user.id,
                })),
            },
            user
        );
        const existingUserIds = existingCourseStaff.map(
            (courseStaff) => courseStaff.userId
        );
        const newUsers = users.filter(
            (user) => !existingUserIds.includes(user.id)
        );
        return await models.courseStaff.createMany(
            newUsers.map((user) => ({
                timetable,
                user,
                role,
                isNew,
            })),
            user
        );
    }

    @Mutation(() => String)
    async removeCourseStaff(
        @Arg("courseStaffId") courseStaffId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<string> {
        await models.courseStaff.delete({ id: courseStaffId }, req.user);
        return courseStaffId;
    }

    @FieldResolver(() => Timetable)
    async timetable(
        @Root() root: CourseStaff,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable> {
        return models.timetable.getById(root.timetableId, req.user);
    }

    @FieldResolver(() => User)
    async user(
        @Root() root: CourseStaff,
        @Ctx() { req, models }: MyContext
    ): Promise<User> {
        return models.user.getById(root.userId, req.user);
    }

    @FieldResolver(() => Preference)
    async preference(
        @Root() root: CourseStaff,
        @Ctx() { req, models }: MyContext
    ): Promise<Preference> {
        return models.preference.getById(root.preferenceId, req.user);
    }
}
