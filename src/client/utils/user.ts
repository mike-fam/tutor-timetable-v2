import { createContext } from "react";
import { UserContextType } from "../types/user";
import { defaultStr } from "../constants";

export const UserContext = createContext<UserContextType>({
    user: {
        id: defaultStr,
        username: "",
        name: "",
        email: "",
    },
    setUser: () => {},
});
