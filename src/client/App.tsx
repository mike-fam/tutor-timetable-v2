import React, { useCallback, useState } from "react";
import { AppRouter } from "./AppRouter";
import {
    ApolloClient,
    ApolloError,
    ApolloProvider,
    InMemoryCache,
} from "@apollo/client";
import { ErrorContext } from "./utils/errors";
import { useToast } from "@chakra-ui/react";
import { Set } from "immutable";
import { IsoDay } from "../types/date";
import { TimetableSettingsContext } from "./utils/timetable";

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
    const [displayedDays, setDisplayedDays] = useState(
        Set([
            IsoDay.MON,
            IsoDay.TUE,
            IsoDay.WED,
            IsoDay.THU,
            IsoDay.FRI,
            IsoDay.SAT,
            IsoDay.SUN,
        ])
    );
    const [dayStartTime, setDayStartTime] = useState(7);
    const [dayEndTime, setDayEndTime] = useState(20);

    return (
        <ErrorContext.Provider value={{ addError }}>
            <ApolloProvider client={client}>
                <TimetableSettingsContext.Provider
                    value={{
                        displayedDays,
                        setDisplayedDays,
                        dayStartTime,
                        setDayStartTime,
                        dayEndTime,
                        setDayEndTime,
                    }}
                >
                    <AppRouter />
                </TimetableSettingsContext.Provider>
            </ApolloProvider>
        </ErrorContext.Provider>
    );
};
