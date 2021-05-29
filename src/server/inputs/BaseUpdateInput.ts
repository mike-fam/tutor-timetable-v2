import { Field, InputType } from "type-graphql";

@InputType()
export class BaseUpdateInput {
    @Field()
    id: string;
}
