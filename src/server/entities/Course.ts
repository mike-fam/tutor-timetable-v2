import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Timetable } from "./Timetable";
import { Lazy } from "../utils/query";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column("varchar", { length: 20, unique: true })
    code: string;

    @Field()
    @Column("varchar", { length: 100 })
    title: string;

    @Field(() => [Timetable])
    @OneToMany(() => Timetable, (timetable) => timetable.course, { lazy: true })
    timetables: Lazy<Timetable[]>;
}
