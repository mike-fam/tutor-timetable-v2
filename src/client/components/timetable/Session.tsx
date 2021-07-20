import { Box, BoxProps } from "@chakra-ui/react";
import React, { forwardRef, useMemo } from "react";
import { sessionStyleFromProps } from "../../utils/timetable";
import { useSessionBgColour } from "../../hooks/useSessionBgColour";
import omit from "lodash/omit";
import { StackInfo } from "../../../types/date";
import { SessionTheme } from "../../types/session";

type SessionProps<T> = {
    sessionId: string;
    name: string;
    startTime: number;
    endTime: number;
    startDay: number;
    endDay: number;
    theme?: SessionTheme;
    timeslotHeight: number;
    custom: (sessionId: string) => T;
} & StackInfo;

type StyleProps = Partial<Omit<BoxProps, "id">>;

export type Props<T> = SessionProps<T> & StyleProps;

export const Session = forwardRef<HTMLDivElement, Props<any>>(
    ({ theme = SessionTheme.PRIMARY, children, ...props }, ref) => {
        const { width, heightPx, display, left, topPx } = useMemo(
            () => sessionStyleFromProps(props),
            [props]
        );
        const bg = useSessionBgColour(theme);
        const styleProps = useMemo(
            () =>
                omit<Props<any>, keyof SessionProps<any>>(props, [
                    "sessionId",
                    "name",
                    "startTime",
                    "endTime",
                    "startDay",
                    "endDay",
                    "stackSize",
                    "timeslotHeight",
                    "elemStackStart",
                    "elemStackIndex",
                    "elemStackWidth",
                    "longestBranchSize",
                    "splitBranchSize",
                    "theme",
                    "custom",
                ]),
            [props]
        );

        return (
            <Box
                position="absolute"
                w={width}
                h={heightPx}
                display={display}
                left={left}
                top={topPx}
                bg={bg}
                color="white"
                rounded="base"
                overflow="hidden"
                {...styleProps}
                ref={ref}
            >
                {children}
            </Box>
        );
    }
);
