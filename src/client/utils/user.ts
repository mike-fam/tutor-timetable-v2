import { createContext } from "react";
import { UserContextType } from "../types/user";
import { notSet } from "../constants";

export const UserContext = createContext<UserContextType>({
    user: {
        id: notSet,
        username: "",
        name: "",
        email: "",
    },
    setUser: () => {},
});
