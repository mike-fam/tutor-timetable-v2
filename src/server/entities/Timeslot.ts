import { Check, Column, Entity, ManyToOne, RelationId } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { IsoDay } from "../../types/date";
import { checkFieldValueInEnum, Lazy } from "../utils/query";
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";
import { UserRelatedEntity } from "./UserRelatedEntity";
import { Utils } from "../utils/Util";

@ObjectType()
@Entity()
// Day is a valid Iso Day number
@Check(checkFieldValueInEnum(IsoDay, "day", true))
export class Timeslot extends BaseEntity implements UserRelatedEntity {
    @Field()
    @Column("float")
    startTime: number;

    @Field()
    @Column("float")
    endTime: number;

    @Field(() => Int)
    @Column("int")
    day: IsoDay;

    @ManyToOne(() => User, (user) => user.availabilities, { lazy: true })
    user: Lazy<User>;

    @RelationId((timeslot: Timeslot) => timeslot.user)
    @Column()
    userId: string;

    public async getOwner(): Promise<User> {
        const loaders = Utils.loaders;
        return await loaders.user.load(this.userId);
    }
}
