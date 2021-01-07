import { Box } from "@chakra-ui/react";
import React from "react";
import { TimeSlot } from "../timetable/TimeSlot";
import { TempTimeslot } from "../../types/availability";

type Props = {
    addTempTimeslot: (timeslot: TempTimeslot) => void;
    time: number;
    day: number;
};

export const AvailabilityTimeslot: React.FC<Props> = ({
    addTempTimeslot,
    time,
    day,
}) => {
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
                onClick={() =>
                    addTempTimeslot({
                        name: `${time}:00-${time + 1}:00`,
                        startTime: time,
                        endTime: time + 1,
                        day,
                    })
                }
            />
        </TimeSlot>
    );
};
