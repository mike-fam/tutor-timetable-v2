import { ArrayElement } from "./helper";
import { TermsQuery } from "../generated/graphql";

export type TermResponseType = ArrayElement<TermsQuery["terms"]>;
