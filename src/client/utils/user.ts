import { createContext } from "react";
import { UserState } from "../types/user";

export const UserContext = createContext<UserState>({
    username: "",
    name: "",
    email: "",
});
