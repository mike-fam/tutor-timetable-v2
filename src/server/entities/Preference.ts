import {
    BaseEntity,
    Check,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { SessionType } from "../../types/session";
import { checkFieldValueInEnum } from "../utils/query";

// Session type is one of the types specified.
@Check(checkFieldValueInEnum(SessionType, "sessionType"))
@Entity()
export class Preference extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 15 })
    sessionType: SessionType;

    @Column()
    maxContigHours: number;

    @Column()
    maxWeeklyHours: number;
}
