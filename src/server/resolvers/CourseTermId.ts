import { Field, InputType } from "type-graphql";

@InputType()
export class CourseTermIdInput {
    @Field()
    courseId: string;

    @Field()
    termId: string;
}
