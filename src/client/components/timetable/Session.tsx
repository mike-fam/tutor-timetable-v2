import { Box, BoxProps } from "@chakra-ui/react";
import React, { useMemo } from "react";
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
    theme?: SessionTheme;
} & StackInfo;

type PropsWithStyle = Props & Partial<Omit<BoxProps, "id">>;

export const Session: React.FC<PropsWithStyle> = ({
    theme = SessionTheme.PRIMARY,
    children,
    ...props
}) => {
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
        >
            {children}
        </Box>
    );
};
