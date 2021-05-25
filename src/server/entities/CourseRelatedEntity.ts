import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CourseRelatedEntity extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
