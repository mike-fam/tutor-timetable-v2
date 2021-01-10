import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { sessionStyleFromProps } from "../../utils/timetable";
import { SessionTheme } from "../../types/timetable";
import { useSessionColour } from "../../hooks/useSessionColour";

export type Props = {
    id: number;
    name: string;
    startTime: number;
    endTime: number;
    startDay: number;
    endDay: number;
    stackSize: number;
    stackIndex: number;
    theme?: SessionTheme;
};

export const Session: React.FC<Props> = ({
    theme = SessionTheme.PRIMARY,
    children,
    ...props
}) => {
    const { width, heightPx, display, left, topPx } = useMemo(
        () => sessionStyleFromProps(props),
        [props]
    );
    const bg = useSessionColour(theme);
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
        >
            {children}
        </Box>
    );
};
