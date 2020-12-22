import {
    Arg,
    Args,
    ArgsType,
    Field,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import { Term } from "../entities";
import {
    SingleItemResponseWithError,
    MultipleItemResponseWithErrors,
} from "./ResponseWithError";

@ObjectType()
class SingleTermResponse extends SingleItemResponseWithError(Term) {}

@ObjectType()
class MultipleTermResponse extends MultipleItemResponseWithErrors(Term) {}

@ArgsType()
class TermArgs {
    @Field()
    index: number;

    @Field()
    type: string;

    @Field()
    year: number;

    @Field()
    startDate: Date;

    @Field()
    endDate: Date;

    @Field(() => [String])
    weekNames: Array<string>;
}

@Resolver()
export class TermResolver {
    @Query(() => [Term])
    async terms(): Promise<Term[]> {
        const terms = await Term.find({});
        console.log(terms);
        return await Term.find({});
    }

    @Query(() => Term, { nullable: true })
    async term(@Arg("id") id: string): Promise<Term | undefined> {
        return await Term.findOne(id);
    }

    @Mutation(() => SingleTermResponse)
    async addTerm(@Args() termArgs: TermArgs): Promise<SingleTermResponse> {
        try {
            const term = await Term.create(termArgs).save();
            return {
                item: term,
            };
        } catch (err) {
            return {
                error: {
                    name: err.name,
                    message: err.detail || err.message,
                },
            };
        }
    }

    @Mutation(() => MultipleTermResponse)
    async deleteTerms(
        @Arg("id", () => [Int]) termIds: Array<number>
    ): Promise<MultipleTermResponse> {
        try {
            const terms = await Term.findByIds(termIds);
            return {
                items: terms,
            };
        } catch (err) {
            return {
                error: {
                    name: err.name,
                    message: err.detail || err.message,
                },
            };
        }
    }
}
