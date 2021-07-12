import { Dispatch, SetStateAction } from "react";
import { MeQuery } from "../generated/graphql";

export type UserState = MeQuery["me"];

export type UserContextType = {
    user: UserState;
    setUser: Dispatch<SetStateAction<UserState>>;
};
