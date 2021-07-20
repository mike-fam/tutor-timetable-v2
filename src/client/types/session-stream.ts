import { ArrayElement } from "./helpers";
import { GetRootSessionStreamsQuery } from "../generated/graphql";

export type StreamResponseType = ArrayElement<
    GetRootSessionStreamsQuery["rootSessionStreams"]
>;
