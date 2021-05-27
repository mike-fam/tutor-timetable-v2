import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/context";
import { BaseEntity } from "../entities/BaseEntity";

export const LoadersInjector: MiddlewareFn<any> = async ({ context }, next) => {
    BaseEntity.setLoaders((context as MyContext).loaders);
    return await next();
};
