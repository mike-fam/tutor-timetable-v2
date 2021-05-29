import { Field, InputType } from "type-graphql";

@InputType()
export class DeleteInput {
    @Field()
    id: string;
}
