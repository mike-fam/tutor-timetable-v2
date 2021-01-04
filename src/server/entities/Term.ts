import {
    BaseEntity,
    Check,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import { Timetable } from "./Timetable";
import { Field, Int, ObjectType } from "type-graphql";
import { checkFieldValueInEnum } from "../utils/query";
import { TermType } from "../../types/term";
import { Lazy } from "../utils/query";

@ObjectType()
@Entity()
@Check(checkFieldValueInEnum(TermType, "type"))
@Unique(["type", "year"])
export class Term extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

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
    @OneToMany(() => Timetable, (timetable) => timetable.term, { lazy: true })
    timetables: Lazy<Timetable[]>;
}
