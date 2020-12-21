import React from "react";
import { AppRouter } from "./AppRouter";
import {
    ApolloCache,
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
    uri: `http://localhost:${process.env.PORT || 5000}/graphql`,
    cache: new InMemoryCache(),
});

export const App: React.FunctionComponent<{}> = () => {
    return (
        <ApolloProvider client={client}>
            <AppRouter />
        </ApolloProvider>
    );
    // return <div>hello</div>;
};
