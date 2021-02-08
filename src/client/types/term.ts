import { ArrayElement } from "./helpers";
import { TermsQuery } from "../generated/graphql";

export type TermResponseType = ArrayElement<TermsQuery["terms"]>;
