import React, { Dispatch, SetStateAction } from "react";
import { Box, Grid } from "@chakra-ui/react";
import { MONTHS } from "../../../constants/date";

type Props = {
    viewedYear: number; // TODO: split to month and year separately?
    setViewedYear: Dispatch<SetStateAction<number>>;
    firstDate?: Date;
    lastDate?: Date;
    disableBefore?: Date;
    disableAfter?: Date;
};

export const CalendarMonthsView: React.FC<Props> = ({
    viewedYear,
    setViewedYear,
    firstDate,
    lastDate,
    disableBefore,
    disableAfter,
}) => {
    return (
        <Grid templateColumns="repeat(3, 1fr)" w="100%" rowGap={1}>
            {MONTHS.map((month) => (
                <Box
                    h={20}
                    _hover={{ cursor: "pointer", bg: "gray.500" }}
                    textAlign="center"
                >
                    {month}
                </Box>
            ))}
        </Grid>
    );
};
