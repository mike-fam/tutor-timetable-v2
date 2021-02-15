import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Lazy } from "../utils/query";
import { Session } from "./Session";
import { StaffRequest } from "./StaffRequest";
import { User } from "./User";

@ObjectType()
@Entity()
export class Offer extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => StaffRequest)
    @ManyToOne(() => StaffRequest, (staffRequest) => staffRequest.offers, {
        lazy: true,
        onDelete: "CASCADE",
    })
    request: Lazy<StaffRequest>;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.offers, { lazy: true })
    user: Lazy<User>;

    @Field(() => [Session])
    @ManyToMany(() => Session, (session) => session.offerPreferences, {
        lazy: true,
        cascade: true,
    })
    @JoinTable()
    preferences: Lazy<Session[]>;
}
