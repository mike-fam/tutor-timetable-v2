import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Timetable } from "./Timetable";

@Entity()
export class Term extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20 })
    type: string;

    @Column("varchar", { length: 100 })
    year: number;

    @Column("date")
    startDate: Date;

    @Column("date")
    endDate: Date;

    @Column("int", { array: true })
    breakWeeks: Array<number>;

    @OneToMany(() => Timetable, (timetable) => timetable.term)
    timetables: Timetable[];
}
