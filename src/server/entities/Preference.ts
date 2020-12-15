import {
    BaseEntity,
    Check,
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { SessionType } from "../../types/session";
import { checkFieldValueInEnum } from "../utils/query";
import { CourseStaff } from "./CourseStaff";

@Entity()
// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "sessionType"))
export class Preference extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 15 })
    sessionType: SessionType;

    @Column()
    maxContigHours: number;

    @Column()
    maxWeeklyHours: number;

    @OneToOne(() => CourseStaff, (courseStaff) => courseStaff.preference)
    courseStaff: CourseStaff;
}
