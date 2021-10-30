import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type Props = {
    selected?: boolean;
    subSelected?: boolean;
    day: number;
    currentMonth: boolean;
    onClick?: () => void;
    onMouseOver?: () => void;
    onMouseLeave?: () => void;
    bold?: boolean;
    disabled?: boolean;
};

export const CalendarDay: React.FC<Props> = ({
    selected = false,
    subSelected = false,
    day,
    currentMonth,
    onClick,
    onMouseLeave,
    onMouseOver,
    bold = false,
    disabled = false,
}) => {
    const subSelectedColour = useColorModeValue("blue.100", "blue.800");
    const selectedColour = useColorModeValue("blue.500", "blue.600");
    const disabledColour = useColorModeValue("gray.300", "gray.600");
    return (
        <Box
            bgColor={
                selected
                    ? selectedColour
                    : subSelected
                    ? subSelectedColour
                    : undefined
            }
            color={
                selected
                    ? "white"
                    : disabled
                    ? disabledColour
                    : !currentMonth
                    ? "gray"
                    : undefined
            }
            _hover={
                disabled
                    ? { cursor: "default" }
                    : {
                          background: subSelectedColour,
                          cursor: "pointer",
                      }
            }
            w="100%"
            h={12}
            p={2}
            fontWeight={bold ? "bold" : "regular"}
            textAlign="center"
            lineHeight={8}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            {day}
        </Box>
    );
};
