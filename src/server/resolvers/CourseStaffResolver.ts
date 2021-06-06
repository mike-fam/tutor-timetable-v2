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
import { getConnection } from "typeorm";
import { redacted } from "../constants";
import { getOrCreateUsersByUsernames } from "../utils/user";
import asyncFilter from "node-filter-async";
import { asyncMap } from "../../utils/array";
import { MyContext } from "../types/context";
import { TimetableModel } from "../models/TimetableModel";
import { Service } from "typedi";
import { EntityResolver } from "./EntityResolver";

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

@Service()
@Resolver(() => CourseStaff)
export class CourseStaffResolver extends EntityResolver {
    @Mutation(() => CourseStaff)
    async addCourseStaff(
        @Arg("courseStaffUserInput")
        { courseId, termId, role, isNew, username }: CourseStaffUserInput
    ): Promise<CourseStaff> {
        const timetable = await Timetable.findOneOrFail({ courseId, termId });
        let user = await User.findOne({ username });
        if (!user) {
            user = await User.create({
                username,
                name: redacted,
                email: redacted,
            }).save();
        }
        const newCourseStaff = CourseStaff.create({
            role,
            isNew,
            timetable,
        });
        newCourseStaff.user = Promise.resolve(user);
        return await newCourseStaff.save();
    }

    @Query(() => [CourseStaff])
    async courseStaffs(
        @Arg("courseTermInput", () => CourseTermIdInput)
        { courseId, termId }: CourseTermIdInput
    ): Promise<CourseStaff[]> {
        return await getConnection()
            .getRepository(CourseStaff)
            .createQueryBuilder("courseStaff")
            .innerJoinAndSelect("courseStaff.timetable", "timetable")
            .where("timetable.courseId = :courseId", { courseId })
            .andWhere("timetable.termId = :termId", { termId })
            .getMany();
    }

    @Mutation(() => [CourseStaff])
    async addUsersToCourse(
        @Arg("courseStaffInput", () => CourseStaffInput)
        { role, isNew, termId, courseId }: CourseStaffInput,
        @Arg("usernames", () => [String]) usernames: string[]
    ): Promise<CourseStaff[]> {
        const timetable = await Timetable.findOneOrFail({ courseId, termId });
        const users = await getOrCreateUsersByUsernames(usernames);
        const existingCourseStaff = await CourseStaff.find({
            where: users.map((user) => ({
                timetableId: timetable.id,
                userId: user.id,
            })),
        });
        const newUsers = await asyncFilter(
            users,
            async (user) =>
                !(
                    await asyncMap(
                        existingCourseStaff,
                        async (courseStaff) => (await courseStaff.user).username
                    )
                ).includes(user.username)
        );
        if (newUsers.length === 0) {
            return [];
        }
        return await CourseStaff.save(
            CourseStaff.create(
                newUsers.map((user) => ({
                    timetable,
                    user,
                    role,
                    isNew,
                }))
            )
        );
    }

    // TODO: Validation
    @Mutation(() => String)
    async removeCourseStaff(
        @Arg("courseStaffId") courseStaffId: string
    ): Promise<string> {
        try {
            await CourseStaff.delete(courseStaffId);
            return courseStaffId;
        } catch (e) {
            throw new Error("Could not remove this staff member");
        }
    }

    @FieldResolver(() => Timetable)
    async timetable(
        @Root() root: CourseStaff,
        @Ctx() { req }: MyContext
    ): Promise<Timetable> {
        return this.timetableModel.getById(root.timetableId, req.user);
    }

    @FieldResolver(() => User)
    async user(
        @Root() root: CourseStaff,
        @Ctx() { req }: MyContext
    ): Promise<User> {
        return this.userModel.getById(root.userId, req.user);
    }

    @FieldResolver(() => Preference)
    async preference(
        @Root() root: CourseStaff,
        @Ctx() { req }: MyContext
    ): Promise<Preference> {
        return this.preferenceModel.getById(root.preferenceId, req.user);
    }
}
