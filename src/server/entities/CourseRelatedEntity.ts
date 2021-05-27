import { ObjectType } from "type-graphql";
import { BaseEntity } from "./BaseEntity";
import { Course } from "./Course";

@ObjectType()
export abstract class CourseRelatedEntity extends BaseEntity {
    public abstract getCourse(): Promise<Course>;
}
