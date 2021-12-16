import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { TimeSlot } from "./TimeSlot";
import { TempTimeslot } from "../../types/availability";

type Props = {
    addNewTimeslot: (timeslot: Omit<TempTimeslot, "id">) => void;
    time: number;
    day: number;
};

export const ClickableTimeslot: FC<Props> = ({ addNewTimeslot, time, day }) => {
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
                    addNewTimeslot({
                        startTime: time,
                        endTime: time + 1,
                        day,
                    })
                }
            />
        </TimeSlot>
    );
};
