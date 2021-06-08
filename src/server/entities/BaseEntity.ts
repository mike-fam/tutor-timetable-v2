import {
    BaseEntity as TypeOrmBaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export abstract class BaseEntity extends TypeOrmBaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
