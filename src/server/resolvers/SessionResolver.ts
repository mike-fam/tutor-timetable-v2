import { Arg, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Session } from "../entities";

@Resolver()
export class SessionResolver {
    @Query(() => [Session])
    async sessions(
        @Arg("termId") termId: string,
        @Arg("courseIds", () => [String]) courseIds: string[],
        @Arg("week", () => Int) week: number
    ): Promise<Session[]> {
        if (courseIds.length === 0) {
            return [];
        }
        return await getConnection()
            .getRepository(Session)
            .createQueryBuilder("session")
            .innerJoinAndSelect("session.sessionStream", "sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where("timetable.termId = :termId", { termId })
            .andWhere("session.week = :week", { week })
            .andWhere("timetable.courseId IN (:...courseIds)", { courseIds })
            .getMany();
    }

    @Query(() => Session)
    async sessionById(@Arg("sessionId") sessionId: string): Promise<Session> {
        return await Session.findOneOrFail({ id: sessionId });
    }
}
