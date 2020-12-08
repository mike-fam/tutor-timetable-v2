import React from "react";
import { Dropdown } from "./components/Dropdown";
import { Wrapper } from "./components/Wrapper";
import { Timetable } from "./components/timetable/Timetable";
import { Day } from "./components/timetable/Day";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import { TimeSlot } from "./components/timetable/TimeSlot";
import { Props as SessionProps, Session } from "./components/timetable/Session";

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
                sessions={[
                    // TODO: hardcoded sessions, should do this in container
                    {
                        id: "1",
                        startTime: 8,
                        endTime: 10,
                        day: 1,
                        name: "P01",
                    },
                ]}
                displayedDays={[1, 2, 3, 4, 5, 6, 7]}
                renderDay={(dayProps, key) => (
                    <Day
                        {...dayProps}
                        renderTimeSlot={(key) => <TimeSlot key={key} />}
                        renderSession={(sessionProps: SessionProps, key) => (
                            <Session {...sessionProps} key={key} />
                        )}
                        key={key}
                    />
                )}
            />
            <Button onClick={() => toggleColorMode()}>Change color mode</Button>
        </Wrapper>
    );
};

export default App;
