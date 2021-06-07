import { Dispatch, SetStateAction } from "react";

export type UserState = {
    id: string;
    username: string;
    name: string;
    email: string;
};

export type UserContextType = {
    user: UserState;
    setUser: Dispatch<SetStateAction<UserState>>;
};
