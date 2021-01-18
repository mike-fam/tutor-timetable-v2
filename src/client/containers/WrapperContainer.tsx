import React, { useCallback, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { ApolloError, ApolloProvider } from "@apollo/client";
import { Set } from "immutable";
import { IsoDay } from "../../types/date";
import { useQueryWithError } from "../hooks/useQueryWithError";
import { useMeQuery } from "../generated/graphql";
import { UserContext } from "../utils/user";
import { ErrorContext } from "../utils/errors";
import { TimetableSettingsContext } from "../utils/timetable";

type Props = {};

export const WrapperContainer: React.FC<Props> = ({ children }) => {
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
    const { data } = useQueryWithError(useMeQuery);

    return (
        <UserContext.Provider
            value={{
                username: data?.me?.username || "",
                email: data?.me?.email || "",
                name: data?.me?.name || "",
            }}
        >
            <ErrorContext.Provider value={{ addError }}>
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
                    {children}
                </TimetableSettingsContext.Provider>
            </ErrorContext.Provider>
        </UserContext.Provider>
    );
};
