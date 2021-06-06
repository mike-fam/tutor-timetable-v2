import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import {
    Course,
    CourseStaff,
    SessionStream,
    Term,
    Timetable,
} from "../entities";
import { Service } from "typedi";
import { EntityResolver } from "./EntityResolver";
import { MyContext } from "../types/context";

@Service()
@Resolver(() => Timetable)
export class TimetableResolver extends EntityResolver {
    @Query(() => [Timetable])
    async timetables(): Promise<Timetable[]> {
        return await Timetable.find({});
    }

    @Query(() => Timetable, { nullable: true })
    async timetable(
        @Arg("courseId") courseId: string,
        @Arg("termId") termId: string
    ): Promise<Timetable | undefined> {
        return await Timetable.findOne({ courseId, termId });
    }

    @Query(() => Timetable, { nullable: true })
    async timetableById(@Arg("id") id: string): Promise<Timetable | undefined> {
        return await Timetable.findOne({ id });
    }

    @FieldResolver(() => Course)
    async course(
        @Root() root: Timetable,
        @Ctx() { req }: MyContext
    ): Promise<Course> {
        return this.courseModel.getById(root.courseId, req.user);
    }

    @FieldResolver(() => Term)
    async term(
        @Root() root: Timetable,
        @Ctx() { req }: MyContext
    ): Promise<Term> {
        return this.termModel.getById(root.termId, req.user);
    }

    @FieldResolver(() => [CourseStaff])
    async courseStaffs(
        @Root() root: Timetable,
        @Ctx() { req }: MyContext
    ): Promise<CourseStaff[]> {
        return this.courseStaffModel.getByIds(root.courseStaffIds, req.user);
    }

    @FieldResolver(() => [SessionStream])
    async sessionStreams(
        @Root() root: Timetable,
        @Ctx() { req }: MyContext
    ): Promise<SessionStream[]> {
        return this.sessionStreamModel.getByIds(
            root.sessionStreamIds,
            req.user
        );
    }
}
