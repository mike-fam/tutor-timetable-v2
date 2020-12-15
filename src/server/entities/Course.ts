import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Timetable } from "./Timetable";

@Entity()
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 9, unique: true })
    code: string;

    @Column("varchar", { length: 9 })
    title: string;

    @OneToMany(() => Timetable, (timetable) => timetable.course)
    timetables: Timetable[];
}
