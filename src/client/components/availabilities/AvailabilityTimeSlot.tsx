import { Box } from "@chakra-ui/react";
import React from "react";
import { TimeSlot } from "../timetable/TimeSlot";

type Props = {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    time: number;
    day: number;
};

export const AvailabilityTimeSlot: React.FC<Props> = ({ onClick }) => {
    return (
        <TimeSlot>
            <Box
                w="100%"
                h="100%"
                _hover={{
                    background: "tomato",
                    opacity: 0.2,
                    cursor: "copy",
                }}
                onClick={onClick}
            />
        </TimeSlot>
    );
};
