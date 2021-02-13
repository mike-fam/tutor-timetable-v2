import { ArrayElement } from "./helpers";
import { GetRequestsByTermIdQuery } from "../generated/graphql";

export type RequestResponse = ArrayElement<
    GetRequestsByTermIdQuery["getRequestsByTermId"]
>;

export type RequestFilterFunction<T> = (
    request: RequestResponse,
    arg: T
) => boolean;

export enum WhoseRequest {
    ME = "Me",
    EVERYONE_ELSE = "Everyone else",
}
