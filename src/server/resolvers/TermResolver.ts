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
import { Term } from "../entities/Term";
import { SingleItemResponseWithErrors } from "./ResponseWithError";

@ObjectType()
class SingleTermResponse extends SingleItemResponseWithErrors(Term) {}

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

    @Field(() => [Int])
    breakWeeks: Array<number>;
}

@Resolver()
export class TermResolver {
    @Query(() => [Term])
    async terms(): Promise<Term[]> {
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
            console.log(Object.keys(err));
            return {
                error: {
                    name: err.name,
                    message: err.detail,
                },
            };
        }
    }
}
