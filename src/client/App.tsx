import React from "react";
import { Dropdown } from "./components/Dropdown";
import { Wrapper } from "./components/Wrapper";
import { Timetable } from "./components/timetable/Timetable";
import { Day } from "./components/timetable/Day";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import { TimeSlot } from "./components/timetable/TimeSlot";

const App = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <Wrapper>
            <Box>
                <Dropdown onChange={(e) => console.log(e.target.value)}>
                    {["s2 2019", "s1 2020", "s2 2020", "s1 2021"]}
                </Dropdown>
            </Box>
            <Timetable
                displayedDays={[1, 2, 3, 4, 5, 6, 7]}
                renderDay={(dayProps) => (
                    <Day {...dayProps} renderTimeSlot={() => <TimeSlot />} />
                )}
            />
            <Button onClick={() => toggleColorMode()}>Change color mode</Button>
        </Wrapper>
    );
};

export default App;
