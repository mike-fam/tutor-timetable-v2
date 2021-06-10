import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { Offer, Session, SessionStream, StaffRequest, User } from "../entities";

import { MyContext } from "../types/context";

@Resolver(() => Session)
export class SessionResolver {
    @Query(() => [Session])
    async sessions(
        @Arg("termId") termId: string,
        @Arg("courseIds", () => [String]) courseIds: string[],
        @Arg("week", () => Int) week: number,
        @Ctx() { req, models }: MyContext
    ): Promise<Session[]> {
        // TODO: Check
        return await models.session.getMany(
            {
                where: courseIds.map((courseId) => ({
                    sessionStream: {
                        timetable: {
                            termId,
                            courseId,
                        },
                    },
                    week,
                })),
            },
            req.user
        );
        // if (courseIds.length === 0) {
        //     return [];
        // }
        // return await getConnection()
        //     .getRepository(Session)
        //     .createQueryBuilder("session")
        //     .innerJoinAndSelect("session.sessionStream", "sessionStream")
        //     .innerJoinAndSelect("sessionStream.timetable", "timetable")
        //     .where("timetable.termId = :termId", { termId })
        //     .andWhere("session.week = :week", { week })
        //     .andWhere("timetable.courseId IN (:...courseIds)", { courseIds })
        //     .getMany();
    }

    @Query(() => Session)
    async sessionById(
        @Arg("sessionId") sessionId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Session> {
        return await models.session.getById(sessionId, req.user);
    }

    @FieldResolver(() => SessionStream)
    async sessionStream(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<SessionStream> {
        return await models.sessionStream.getById(
            root.sessionStreamId,
            req.user
        );
    }

    @FieldResolver(() => [User])
    async allocatedUsers(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<User[]> {
        return await models.user.getByIds(root.allocatedUserIds, req.user);
    }

    @FieldResolver(() => [StaffRequest])
    async requests(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest[]> {
        return await models.staffRequest.getByIds(root.requestIds, req.user);
    }

    @FieldResolver(() => [StaffRequest])
    async preferredSwapRequests(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<StaffRequest[]> {
        return await models.staffRequest.getByIds(
            root.preferredSwapRequestIds,
            req.user
        );
    }

    @FieldResolver(() => [Offer])
    async preferredSwapOffers(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer[]> {
        return await models.offer.getByIds(
            root.preferredSwapOfferIds,
            req.user
        );
    }

    @FieldResolver(() => [Offer])
    async acceptedOffers(
        @Root() root: Session,
        @Ctx() { req, models }: MyContext
    ): Promise<Offer[]> {
        return await models.offer.getByIds(root.acceptedOfferIds, req.user);
    }

    @FieldResolver(() => Date)
    async date(@Root() root: Session): Promise<Date> {
        return root.date();
    }
}
