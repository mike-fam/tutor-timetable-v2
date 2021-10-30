import React from "react";
import { AppRouter } from "./AppRouter";
import {
    ApolloClient,
    ApolloLink,
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
import { __prod__ } from "../constants";
import Observable from "zen-observable";
import {
    convertDataToHaveDates,
    sanitiseVariableWithDates,
} from "./utils/apollo-link";

const httpLink = new HttpLink({
    uri: "/graphql",
});

const retryLink = new RetryLink();

// Link to convert all date strings to Date object
const dateLink = new ApolloLink((operation, forward) => {
    operation.variables = sanitiseVariableWithDates(operation.variables);
    // Workaround
    // https://github.com/apollographql/apollo-client/issues/5295#issuecomment-607744565
    return Observable.from(forward(operation)).map((data) => {
        return convertDataToHaveDates(data);
    });
});

const wsLink = new WebSocketLink({
    uri: `ws${__prod__ ? "s" : ""}://${window.location.host}/graphql`,
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
    link: from([dateLink, splitLink]),
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
