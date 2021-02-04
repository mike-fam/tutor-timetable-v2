import { GetRequestsByCourseIdsQuery } from "../generated/graphql";
import { ArrayElement } from "./helpers";

export type RequestResponse = ArrayElement<
    GetRequestsByCourseIdsQuery["getRequestsByCourseIds"]
>;
