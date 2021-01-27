import { Box, BoxProps } from "@chakra-ui/react";
import React, { forwardRef, useMemo } from "react";
import { sessionStyleFromProps } from "../../utils/timetable";
import { SessionTheme } from "../../types/timetable";
import { useSessionColour } from "../../hooks/useSessionColour";
import omit from "lodash/omit";
import { StackInfo } from "../../../types/date";

export type Props = {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    startDay: number;
    endDay: number;
    allocation: Array<string>;
    location: string;
    theme?: SessionTheme;
} & StackInfo;

type PropsWithStyle = Props & Partial<Omit<BoxProps, "id">>;

export const Session: React.FC<PropsWithStyle> = forwardRef<
    HTMLDivElement,
    PropsWithStyle
>(({ theme = SessionTheme.PRIMARY, children, ...props }, ref) => {
    const { width, heightPx, display, left, topPx } = useMemo(
        () => sessionStyleFromProps(props),
        [props]
    );
    const bg = useSessionColour(theme);
    const styleProps = useMemo(
        () =>
            omit<PropsWithStyle, keyof Props>(props, [
                "id",
                "name",
                "startTime",
                "endTime",
                "startDay",
                "endDay",
                "stackSize",
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
});
