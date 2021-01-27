import React from "react";
import { AppRouter } from "./AppRouter";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { WrapperContainer } from "./containers/WrapperContainer";

const client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache({
        addTypename: false,
        typePolicies: {
            Query: {
                fields: {
                    me: {
                        merge: true,
                    },
                },
            },
        },
    }),
});

export const App: React.FunctionComponent<{}> = () => {
    return (
        <ApolloProvider client={client}>
            <WrapperContainer>
                <AppRouter />
            </WrapperContainer>
        </ApolloProvider>
    );
};
