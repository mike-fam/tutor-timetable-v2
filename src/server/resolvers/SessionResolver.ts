import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Session } from "../entities";

@Resolver()
export class SessionResolver {
    @Query(() => [Session])
    async sessions(
        @Arg("termId") termId: number,
        @Arg("courseIds", () => [Int]) courseIds: number,
        @Arg("week", () => Int) week: number
    ): Promise<Session[]> {
        return await getConnection()
            .getRepository(Session)
            .createQueryBuilder("session")
            .innerJoinAndSelect("session.sessionStream", "sessionStream")
            .innerJoinAndSelect("sessionStream.timetable", "timetable")
            .where("timetable.termId = :termId", { termId })
            .andWhere("session.week = :week", { week })
            .andWhere("timetable.courseId IN (:...courseIds)", { courseIds }).getMany();
    }
}
