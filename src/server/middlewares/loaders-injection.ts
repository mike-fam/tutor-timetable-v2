import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/context";
import { Utils } from "../utils/Util";

export const LoadersInjector: MiddlewareFn<MyContext> = async (
    { context },
    next
) => {
    Utils.setLoaders(context.loaders);
    return await next();
};
