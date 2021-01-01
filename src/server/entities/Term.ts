import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Timetable } from "./Timetable";
import { Field, Int, ObjectType } from "type-graphql";
import { Lazy } from "../utils/query";

@ObjectType()
@Entity()
export class Term extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("varchar", { length: 20 })
    type: string;

    @Field(() => Int)
    @Column("varchar", { length: 100 })
    year: number;

    @Field(() => Date)
    @Column("date")
    startDate: Date;

    @Field(() => Date)
    @Column("date")
    endDate: Date;

    @Field(() => [Int])
    @Column("int", { array: true })
    breakWeeks: Array<number>;

    @Field(() => [Timetable])
    @OneToMany(() => Timetable, (timetable) => timetable.term, { lazy: true })
    timetables: Lazy<Timetable[]>;
}
