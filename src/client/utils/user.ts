import { createContext } from "react";
import { UserContextType } from "../types/user";

export const UserContext = createContext<UserContextType>({
    user: {
        username: "",
        name: "",
        email: "",
    },
    setUser: () => {},
});
