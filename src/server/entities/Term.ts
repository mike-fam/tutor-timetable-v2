import { Check, Column, Entity, OneToMany, RelationId, Unique } from "typeorm";
import { Timetable } from "./Timetable";
import { Field, Int, ObjectType } from "type-graphql";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { TermType } from "../types/term";
import { BaseEntity } from "./BaseEntity";
import isBefore from "date-fns/isBefore";
import isAfter from "date-fns/isAfter";

@ObjectType()
@Entity()
@Check(checkFieldValueInEnum(TermType, "type"))
@Unique(["type", "year"])
export class Term extends BaseEntity {
    @Field(() => TermType)
    @Column("varchar", { length: 20 })
    type: TermType;

    @Field(() => Int)
    @Column()
    year: number;

    @Field(() => Date)
    @Column({ type: "timestamp without time zone" })
    startDate: Date;

    @Field(() => Date)
    @Column({ type: "timestamp without time zone" })
    endDate: Date;

    // TODO: Validate length of this array
    @Field(() => [String])
    @Column("varchar", { array: true, default: () => "array[]::varchar[]" })
    weekNames: Array<string>;

    @Field(() => [Timetable])
    @OneToMany(() => Timetable, (timetable) => timetable.termId, { lazy: true })
    timetables: Lazy<Timetable[]>;

    @RelationId((term: Term) => term.timetables)
    timetableIds: string[];

    @Field()
    @Column({ default: false })
    isActive: boolean;

    public static async getActiveTerm(): Promise<Term> {
        const terms = await Term.find();
        for (const term of terms) {
            if (term.isActive) {
                return term;
            }
        }
        const today = new Date();
        for (const term of terms) {
            if (
                isBefore(today, term.endDate) &&
                isAfter(today, term.startDate)
            ) {
                return term;
            }
        }
        throw new Error(
            "No active term. There must be EXACTLY ONE " +
                "active term to perform this action."
        );
    }
}
