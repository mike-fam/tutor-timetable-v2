import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CourseTermIdInput {
    @Field(() => Int)
    courseId: number;

    @Field(() => Int)
    termId: number;
}
