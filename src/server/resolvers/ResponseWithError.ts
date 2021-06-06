import { ClassType, Field, ObjectType } from "type-graphql";

@ObjectType()
class ErrorType {
    @Field()
    name: string;

    @Field()
    message: string;
}

@ObjectType({ isAbstract: true })
abstract class ResponseWithErrorClass {
    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

export const SingleItemResponseWithError = <ItemType>(
    itemType: ClassType<ItemType>
) => {
    @ObjectType({ isAbstract: true })
    abstract class SingleItemResponseWithErrorClass extends ResponseWithErrorClass {
        @Field(() => itemType, { nullable: true })
        item?: ItemType;
    }

    return SingleItemResponseWithErrorClass;
};

export const MultipleItemResponseWithErrors = <ItemType>(
    itemType: ClassType<ItemType>
) => {
    @ObjectType({ isAbstract: true })
    abstract class MultipleItemResponseWithErrorClass extends ResponseWithErrorClass {
        @Field(() => [itemType], { nullable: true })
        items?: Array<ItemType>;
    }

    return MultipleItemResponseWithErrorClass;
};
