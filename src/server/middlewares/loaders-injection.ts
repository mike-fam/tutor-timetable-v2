import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/context";
import { BaseEntity } from "../entities/BaseEntity";

export const LoadersInjector: MiddlewareFn<MyContext> = async (
    { context },
    next
) => {
    BaseEntity.setLoaders(context.loaders);
    return await next();
};
