import React from "react";
import { ApolloError } from "@apollo/client";

export const FeedbackContext = React.createContext({
    addError: (error: ApolloError) => {},
    addSuccess: (title?: string, message?: string) => {},
});
