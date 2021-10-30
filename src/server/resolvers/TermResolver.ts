import {
    Arg,
    Ctx,
    Field,
    FieldResolver,
    InputType,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
} from "type-graphql";
import { Term, Timetable } from "../entities";
import { TermType } from "../types/term";
import { MyContext } from "../types/context";
import startOfISOWeek from "date-fns/startOfISOWeek";
import endOfISOWeek from "date-fns/endOfISOWeek";

@InputType()
class TermInput {
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

    @Field()
    isActive: boolean;
}

@InputType()
class UpdateTermInput extends TermInput {
    @Field()
    id: string;
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
    async createTerm(
        @Arg("termInput") termInput: TermInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Term> {
        if (termInput.isActive) {
            await models.term.update({}, { isActive: false }, req.user);
        }
        const { startDate, endDate } = termInput;
        termInput.startDate = startOfISOWeek(startDate);
        termInput.endDate = endOfISOWeek(endDate);
        return await models.term.create(termInput, req.user);
    }

    @Mutation(() => Term)
    async updateTerm(
        @Arg("termInput") { id, ...updatedFields }: UpdateTermInput,
        @Ctx() { req, models }: MyContext
    ): Promise<Term> {
        if (updatedFields.isActive) {
            await models.term.update({}, { isActive: false }, req.user);
        }
        const { startDate, endDate } = updatedFields;
        updatedFields.startDate = startOfISOWeek(startDate);
        updatedFields.endDate = endOfISOWeek(endDate);
        return await models.term.update({ id }, updatedFields, req.user);
    }

    @Mutation(() => String)
    async deleteTerm(
        @Arg("termId") termId: string,
        @Ctx() { req, models }: MyContext
    ): Promise<string> {
        await models.term.delete({ id: termId }, req.user);
        return termId;
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
