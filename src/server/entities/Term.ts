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

@ObjectType()
@Entity()
@Check(checkFieldValueInEnum(TermType, "type"))
@Unique(["index", "type", "year"])
export class Term extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int)
    @Column()
    index: number;

    @Field()
    @Column("varchar", { length: 20 })
    type: string;

    @Field(() => Int)
    @Column()
    year: number;

    @Field()
    @Column("date")
    startDate: Date;

    @Field()
    @Column("date")
    endDate: Date;

    @Field(() => [Int])
    @Column("int", { array: true })
    breakWeeks: Array<number>;

    @Field(() => [Timetable])
    @OneToMany(() => Timetable, (timetable) => timetable.term)
    timetables: Timetable[];
}
