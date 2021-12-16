import { FC, useCallback } from "react";
import { Box, Grid, useColorModeValue } from "@chakra-ui/react";
import range from "lodash/range";

type Props = {
    viewedYear: number;
    setViewedYear: (year: number) => void;
    firstDate?: Date;
    lastDate?: Date;
    disableBefore?: Date;
    disableAfter?: Date;
};

export const CalendarYearsView: FC<Props> = ({
    viewedYear,
    setViewedYear,
    firstDate,
    lastDate,
    disableAfter,
    disableBefore,
}) => {
    const isYearDisabled = useCallback(
        (year: number) => {
            if (firstDate && year < firstDate.getFullYear()) {
                return true;
            }
            if (lastDate && year > lastDate.getFullYear()) {
                return true;
            }
            if (disableBefore && year < disableBefore.getFullYear()) {
                return true;
            }
            if (disableAfter && year > disableAfter.getFullYear()) {
                return true;
            }
            return false;
        },
        [lastDate, firstDate, disableBefore, disableAfter]
    );
    const disabledColour = useColorModeValue("gray.300", "gray.600");
    const hoverColour = useColorModeValue("gray.200", "gray.700");
    return (
        <Grid templateColumns="repeat(3, 1fr)" w="100%" rowGap={1}>
            {range(viewedYear - 4, viewedYear + 8).map((year) => (
                <Box
                    key={year}
                    h={16}
                    p={3}
                    lineHeight={10}
                    _hover={{ cursor: "pointer", bg: hoverColour }}
                    textAlign="center"
                    onClick={() => {
                        if (!isYearDisabled(year)) {
                            setViewedYear(year);
                        }
                    }}
                    color={isYearDisabled(year) ? disabledColour : undefined}
                    borderRadius={5}
                >
                    {year}
                </Box>
            ))}
        </Grid>
    );
};
