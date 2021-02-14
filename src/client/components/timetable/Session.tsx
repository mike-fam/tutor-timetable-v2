import { Box, BoxProps } from "@chakra-ui/react";
import React, { forwardRef, useMemo } from "react";
import { sessionStyleFromProps } from "../../utils/timetable";
import { useSessionColour } from "../../hooks/useSessionColour";
import omit from "lodash/omit";
import { StackInfo } from "../../../types/date";
import { SessionTheme } from "../../types/session";

type SessionProps = {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    startDay: number;
    endDay: number;
    theme?: SessionTheme;
    timeslotHeight: number;
} & StackInfo;

type StyleProps = Partial<Omit<BoxProps, "id">>;

export type Props = SessionProps & StyleProps;

export const Session: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
    ({ theme = SessionTheme.PRIMARY, children, ...props }, ref) => {
        const { width, heightPx, display, left, topPx } = useMemo(
            () => sessionStyleFromProps(props),
            [props]
        );
        const bg = useSessionColour(theme);
        const styleProps = useMemo(
            () =>
                omit<Props, keyof SessionProps>(props, [
                    "id",
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
