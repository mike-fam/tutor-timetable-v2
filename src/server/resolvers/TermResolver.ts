import {
    Arg,
    Args,
    ArgsType,
    Field,
    Int,
    Mutation,
    Query,
    Resolver
} from "type-graphql";
import { Term } from "../entities";
import { TermType } from "../types/term";

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
}
