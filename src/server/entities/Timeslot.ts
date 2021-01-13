import {
    BaseEntity,
    Check,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { IsoDay } from "../../types/date";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { User } from "./User";

@ObjectType()
@Entity()
// Day is a valid Iso Day number
@Check(checkFieldValueInEnum(IsoDay, "day", true))
export class Timeslot extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("float")
    startTime: number;

    @Field()
    @Column("float")
    endTime: number;

    @Field()
    @Column("int")
    day: IsoDay;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.availabilities, { lazy: true })
    user: Lazy<User>;
}
