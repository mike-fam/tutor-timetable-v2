import React from "react";
import { AppRouter } from "./AppRouter";
import {
    ApolloClient,
    ApolloProvider,
    from,
    HttpLink,
    InMemoryCache,
    split,
} from "@apollo/client";
import { WrapperContainer } from "./containers/WrapperContainer";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { RetryLink } from "@apollo/client/link/retry";

const httpLink = new HttpLink({
    uri: "/graphql",
});

const retryLink = new RetryLink();

const wsLink = new WebSocketLink({
    uri: `ws://${window.location.host}/graphql`,
    options: {
        reconnect: true,
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    from([retryLink, httpLink])
);

const client = new ApolloClient({
    link: splitLink,
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
