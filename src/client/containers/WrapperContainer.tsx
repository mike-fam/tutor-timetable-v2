import React, { useCallback, useEffect, useState } from "react";
import { Box, Center, useToast } from "@chakra-ui/react";
import { ApolloError } from "@apollo/client";
import { IsoDay } from "../../types/date";
import { useQueryWithError } from "../hooks/useQueryWithError";
import { useMeQuery } from "../generated/graphql";
import { UserContext } from "../utils/user";
import { ErrorContext } from "../utils/errors";
import { TimetableSettingsContext } from "../utils/timetable";
import { UserState } from "../types/user";
import { Footer } from "../Footer";
import { defaultStr, footerHeight } from "../constants";
import { SessionsContext, useSessionUtils } from "../hooks/useSessionUtils";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
    displayedDaysKey,
    showMySessionsKeys,
} from "../constants/localStorageKeys";
import { LoadingSpinner } from "../components/helpers/LoadingSpinner";

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
    const [displayedDays, setDisplayedDays] = useLocalStorage(
        displayedDaysKey,
        [
            IsoDay.MON,
            IsoDay.TUE,
            IsoDay.WED,
            IsoDay.THU,
            IsoDay.FRI,
            IsoDay.SAT,
            IsoDay.SUN,
        ]
    );
    const [user, setUser] = useState<UserState>({
        id: defaultStr,
        username: defaultStr,
        email: defaultStr,
        name: defaultStr,
        isAdmin: false,
        courseStaffs: [],
    });
    const [showMySessionsOnly, setShowMySessionsOnly] = useLocalStorage(
        showMySessionsKeys,
        false
    );
    const [dayStartTime, setDayStartTime] = useState(7);
    const [dayEndTime, setDayEndTime] = useState(20);
    const { data, loading } = useQueryWithError(useMeQuery);
    const sessionsUtil = useSessionUtils();

    useEffect(() => {
        if (!data?.me) {
            return;
        }
        setUser(data.me);
    }, [data]);
    if (!data?.me || loading || !user.id) {
        console.log("No data yet");
        return (
            <Center>
                <LoadingSpinner />
            </Center>
        );
    }
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
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
                        displayMySessionsOnly: showMySessionsOnly,
                        setDisplayMySessionsOnly: setShowMySessionsOnly,
                    }}
                >
                    <SessionsContext.Provider value={sessionsUtil}>
                        <Box
                            minH={`calc(100vh - ${footerHeight * 4}px)`}
                            mb={5}
                        >
                            {children}
                        </Box>
                        <Footer />
                    </SessionsContext.Provider>
                </TimetableSettingsContext.Provider>
            </ErrorContext.Provider>
        </UserContext.Provider>
    );
};
