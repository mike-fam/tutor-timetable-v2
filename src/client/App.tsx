import React, { useCallback } from "react";
import { AppRouter } from "./AppRouter";
import {
    ApolloClient,
    ApolloError,
    ApolloProvider,
    InMemoryCache,
} from "@apollo/client";
import { ErrorContext } from "./utils/errors";
import { useToast } from "@chakra-ui/react";

const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
});

export const App: React.FunctionComponent<{}> = () => {
    const toast = useToast({});
    const addError = useCallback(
        (error: ApolloError) => {
            toast({
                title: error.name,
                description: error.message,
                position: "bottom",
                status: "error",
                isClosable: true,
                duration: 9000,
            });
        },
        [toast]
    );
    return (
        <ErrorContext.Provider value={{ addError }}>
            <ApolloProvider client={client}>
                <AppRouter />
            </ApolloProvider>
        </ErrorContext.Provider>
    );
};
