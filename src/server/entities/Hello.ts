import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Hello extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Field()
    @Column({ length: 256 })
    hello: string;
}
