import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Timetable } from "./Timetable";
import { Field, Int } from "type-graphql";

@Entity()
export class Course extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("varchar", { length: 9, unique: true })
    code: string;

    @Field()
    @Column("varchar", { length: 9 })
    title: string;

    @Field(() => [Timetable])
    @OneToMany(() => Timetable, (timetable) => timetable.course)
    timetables: Timetable[];
}
