import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryColumn({ length: 9 })
    username: string;

    @Field()
    @Column({ length: 64 })
    name: string;

    @Field()
    @Column({ length: 256 })
    email: string;
}
