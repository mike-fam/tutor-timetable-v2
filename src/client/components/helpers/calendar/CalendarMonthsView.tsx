import { FC, useCallback } from "react";
import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import { MONTHS } from "../../../constants/date";

type Props = {
    viewedYear: number;
    setViewedMonth: (month: number) => void;
    firstDate?: Date;
    lastDate?: Date;
    disableBefore?: Date;
    disableAfter?: Date;
};

export const CalendarMonthsView: FC<Props> = ({
    setViewedMonth,
    viewedYear,
    firstDate,
    lastDate,
    disableBefore,
    disableAfter,
}) => {
    const isMonthDisabled = useCallback(
        (month: number) => {
            if (firstDate) {
                if (viewedYear < firstDate.getFullYear()) {
                    return true;
                }
                if (
                    viewedYear === firstDate.getFullYear() &&
                    month < firstDate.getMonth()
                ) {
                    return true;
                }
            }
            if (lastDate) {
                if (viewedYear > lastDate.getFullYear()) {
                    return true;
                }
                if (
                    viewedYear === lastDate.getFullYear() &&
                    month > lastDate.getMonth()
                ) {
                    return true;
                }
            }
            if (disableBefore) {
                if (viewedYear < disableBefore.getFullYear()) {
                    return true;
                }
                if (
                    viewedYear === disableBefore.getFullYear() &&
                    month > disableBefore.getMonth()
                ) {
                    return true;
                }
            }
            if (disableAfter) {
                if (viewedYear > disableAfter.getFullYear()) {
                    return true;
                }
                if (
                    viewedYear === disableAfter.getFullYear() &&
                    month > disableAfter.getMonth()
                ) {
                    return true;
                }
            }
            return false;
        },
        [lastDate, firstDate, disableBefore, disableAfter, viewedYear]
    );
    const disabledColour = useColorModeValue("gray.300", "gray.600");
    const hoverColour = useColorModeValue("gray.200", "gray.700");
    return (
        <Grid templateColumns="repeat(3, 1fr)" w="100%" rowGap={1}>
            {MONTHS.map((month, index) => (
                <Box
                    key={month}
                    h={16}
                    p={3}
                    lineHeight={10}
                    _hover={{ cursor: "pointer", bg: hoverColour }}
                    textAlign="center"
                    onClick={() => {
                        if (!isMonthDisabled(index)) {
                            setViewedMonth(index);
                        }
                    }}
                    color={isMonthDisabled(index) ? disabledColour : undefined}
                    borderRadius={5}
                >
                    {month}
                </Box>
            ))}
        </Grid>
    );
};
