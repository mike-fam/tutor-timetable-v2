import { ArrayElement } from "./helpers";
import { GetSessionsQuery } from "../generated/graphql";

export type SessionResponseType = ArrayElement<GetSessionsQuery["sessions"]>;

export enum SessionTheme {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    WARNING = "WARNING",
    PRIMARY = "PRIMARY",
}
