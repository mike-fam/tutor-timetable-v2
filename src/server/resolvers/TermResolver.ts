import {
    Arg,
    Args,
    ArgsType,
    Ctx,
    Field,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { Term, Timetable } from "../entities";
import { TermType } from "../types/term";
import { MyContext } from "../types/context";
import { In } from "typeorm";

@ArgsType()
class TermArgs {
    @Field(() => TermType)
    type: TermType;

    @Field()
    year: number;

    @Field()
    startDate: Date;

    @Field()
    endDate: Date;

    @Field(() => [String])
    weekNames: Array<string>;
}

@Resolver(() => Term)
export class TermResolver {
    @Query(() => [Term])
    async terms(@Ctx() { req, models }: MyContext): Promise<Term[]> {
        return await models.term.getMany({}, req.user);
    }

    @Query(() => Term)
    async activeTerm(@Ctx() { models }: MyContext): Promise<Term> {
        return await models.term.getActiveTerm();
    }

    @Query(() => Term)
    async term(
        @Arg("termId") termId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<Term> {
        return await models.term.getById(termId, req.user);
    }

    @Mutation(() => Term)
    async addTerm(
        @Args() termArgs: TermArgs,
        @Ctx() { req, models }: MyContext
    ): Promise<Term> {
        return await models.term.create(termArgs, req.user);
    }

    @Mutation(() => [Term])
    async deleteTerms(
        @Arg("id", () => [String]) termIds: Array<string>,
        @Ctx() { req, models }: MyContext
    ): Promise<Term[]> {
        return await models.term.deleteMany({ id: In(termIds) }, req.user);
        // const terms = await Term.findByIds(termIds);
        // terms.forEach((term) => term.remove());
        // return terms;
    }

    @FieldResolver(() => [Timetable])
    async timetables(
        @Root() root: Term,
        @Ctx() { req, models }: MyContext
    ): Promise<Timetable[]> {
        return await models.timetable.getByIds(root.timetableIds, req.user);
    }

    @FieldResolver(() => Int)
    async numberOfWeeks(@Root() root: Term): Promise<number> {
        return root.numberOfWeeks();
    }
}
