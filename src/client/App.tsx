import React from "react";
import { Dropdown } from "./components/Dropdown";
import { CourseSelectContainer } from "./containers/CourseSelectContainer";
import { Wrapper } from "./components/Wrapper";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import { TimetableContainer } from "./containers/TimetableContainer";
import { WeekNavContainer } from "./containers/WeekNavContainer";
import { NavBar } from "./components/NavBar";

const App = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <Wrapper>
            <NavBar />
            <CourseSelectContainer />
            <Box>
                <Dropdown onChange={(e) => console.log(e.target.value)}>
                    {["s2 2019", "s1 2020", "s2 2020", "s1 2021"]}
                </Dropdown>
            </Box>
            <TimetableContainer />
            <WeekNavContainer />
            <Button onClick={() => toggleColorMode()}>Change color mode</Button>
        </Wrapper>
    );
};

export default App;
