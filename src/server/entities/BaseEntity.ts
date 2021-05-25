import {
    BaseEntity as TypeOrmBaseEntity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BaseEntity extends TypeOrmBaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
