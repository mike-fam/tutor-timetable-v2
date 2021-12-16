import { ApolloError } from "@apollo/client";
import { createContext } from "react";

export const FeedbackContext = createContext({
    addError: (error: ApolloError) => {},
    addSuccess: (title?: string, message?: string) => {},
});
