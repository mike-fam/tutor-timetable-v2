import { ArrayElement } from "./helpers";
import { GetSessionsQuery } from "../generated/graphql";

export type SessionResponseType = ArrayElement<GetSessionsQuery["sessions"]>;
