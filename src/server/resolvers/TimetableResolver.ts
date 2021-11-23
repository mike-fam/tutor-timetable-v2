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
    Course,
    CourseStaff,
    SessionStream,
    Term,
    Timetable,
} from "../entities";

import { MyContext } from "../types/context";
import { FreezeState } from "../types/timetable";
import { CourseTermIdInput } from "./CourseTermId";

@InputType()
export class TimetableInput extends CourseTermIdInput {
    @Field()
    permanentRequestLock: FreezeState;

    @Field()
    temporaryRequestLock: FreezeState;
}

@Resolver(() => Timetable)
export class TimetableResolver {
    @Query(() => [Timetable])
    async timetables(@Ctx() { req, models }: MyContext): Promise<Timetable[]> {
        return await models.timetable.getMany({}, req.user);
    }

    @Query(() => Timetable)
    async timetable(
        @Arg("courseTermId") { courseId, termId }: CourseTermIdInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable> {
        return await models.timetable.get({ courseId, termId }, req.user);
    }

    @Mutation(() => Timetable)
    async createTimetable(
        @Arg("timetableInput") timetableInput: TimetableInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable> {
        return await models.timetable.create(timetableInput, req.user);
    }

    @Mutation(() => Timetable)
    async updateTimetable(
        @Arg("timetableInput") timetableInput: TimetableInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable> {
        const { courseId, termId, ...rest } = timetableInput;
        return await models.timetable.update(
            { courseId, termId },
            rest,
            req.user
        );
    }

    @Mutation(() => String)
    async deleteTimetable(
        @Arg("timetableId") timetableId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable> {
        return await models.timetable.delete({ id: timetableId }, req.user);
    }

    @Query(() => Timetable)
    async timetableById(
        @Arg("id") id: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable> {
        return await models.timetable.getById(id, req.user);
    }

    @FieldResolver(() => Course)
    async course(
        @Root() root: Timetable,
        @Ctx() { req, models }: MyContext
    ): Promise<Course> {
        return await models.course.getById(root.courseId, req.user);
    }

    @FieldResolver(() => Term)
    async term(
        @Root() root: Timetable,
        @Ctx() { req, models }: MyContext
    ): Promise<Term> {
        return await models.term.getById(root.termId, req.user);
    }

    @FieldResolver(() => [CourseStaff])
    async courseStaffs(
        @Root() root: Timetable,
        @Ctx() { req, models }: MyContext
    ): Promise<CourseStaff[]> {
        return await models.courseStaff.getByIds(root.courseStaffIds, req.user);
    }

    @FieldResolver(() => [SessionStream])
    async sessionStreams(
        @Root() root: Timetable,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream[]> {
        return await models.sessionStream.getByIds(
            root.sessionStreamIds,
            req.user
        );
    }
}
