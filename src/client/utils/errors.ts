import React from "react";
import { ApolloError } from "@apollo/client";

export const ErrorContext = React.createContext({
    addError: (error: ApolloError) => {},
});
