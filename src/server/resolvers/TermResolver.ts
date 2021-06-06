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
import { EntityResolver } from "./EntityResolver";
import { MyContext } from "../types/context";
import { Service } from "typedi";

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

@Service()
@Resolver(() => Term)
export class TermResolver extends EntityResolver {
    @Query(() => [Term])
    async terms(): Promise<Term[]> {
        return await Term.find({});
    }

    @Query(() => Term)
    async term(@Arg("termId") termId: string): Promise<Term> {
        return await Term.findOneOrFail(termId);
    }

    @Mutation(() => Term)
    async addTerm(@Args() termArgs: TermArgs): Promise<Term> {
        return await Term.create(termArgs).save();
    }

    @Mutation(() => [Term])
    async deleteTerms(
        @Arg("id", () => [Int]) termIds: Array<number>
    ): Promise<Term[]> {
        const terms = await Term.findByIds(termIds);
        terms.forEach((term) => term.remove());
        return terms;
    }

    @FieldResolver(() => [Timetable])
    async timetables(
        @Root() root: Term,
        @Ctx() { req }: MyContext
    ): Promise<Timetable[]> {
        return this.timetableModel.getByIds(root.timetableIds, req.user);
    }
}
