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
import { Course, Timetable } from "../entities";
import { MyContext } from "../types/context";

@InputType()
export class CourseInput {
    @Field()
    code: string;

    @Field()
    title: string;
}

@InputType()
export class UpdateCourseInput extends CourseInput {
    @Field()
    id: string;
}

@Resolver(() => Course)
export class CourseResolver {
    @Query(() => [Course])
    async courses(@Ctx() { req, models }: MyContext): Promise<Course[]> {
        return models.course.getManyBy({}, req.user);
    }

    @Query(() => Course)
    async course(
        @Arg("courseId") courseId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Course> {
        return await models.course.getById(courseId, req.user);
    }

    @Mutation(() => Course)
    async createCourse(
        @Arg("courseInput") { code, title }: CourseInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Course> {
        return await models.course.create({ code, title }, req.user);
    }

    @Mutation(() => Course)
    async updateCourse(
        @Arg("courseInput") { id, code, title }: UpdateCourseInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Course> {
        return await models.course.update({ id }, { code, title }, req.user);
    }

    @Mutation(() => String)
    async deleteCourse(
        @Arg("courseId") courseId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<string> {
        await models.course.delete({ id: courseId }, req.user);
        return courseId;
    }

    @FieldResolver(() => [Timetable])
    async timetables(
        @Root() course: Course,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable[]> {
        return await models.timetable.getByIds(course.timetableIds, req.user);
    }
}
