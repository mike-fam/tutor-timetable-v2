import { Check, Column, Entity, OneToMany, Unique } from "typeorm";
import { Timetable } from "./Timetable";
import { Field, Int, ObjectType } from "type-graphql";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { TermType } from "../types/term";
import { BaseEntity } from "./BaseEntity";

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

    @Field()
    @Column({ default: false })
    isActive: boolean;
}
