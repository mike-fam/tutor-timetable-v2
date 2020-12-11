import React, { useState } from "react";
import { Dropdown } from "./components/Dropdown";
import { CourseSelectContainer } from "./containers/CourseSelectContainer";
import { Wrapper } from "./components/Wrapper";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import { TimetableContainer } from "./containers/TimetableContainer";
import { WeekNavContainer } from "./containers/WeekNavContainer";
import { Loadable } from "./components/Loadable";

const App = () => {
    const { toggleColorMode } = useColorMode();
    const [loading, setLoading] = useState(false);
    return (
        <Wrapper>
            <CourseSelectContainer />
            <Box>
                <Dropdown onChange={(e) => console.log(e.target.value)}>
                    {["s2 2019", "s1 2020", "s2 2020", "s1 2021"]}
                </Dropdown>
            </Box>
            <TimetableContainer />
            <WeekNavContainer />
            <Loadable isLoading={loading}>
                <Box>data 2</Box>
            </Loadable>
            <Button onClick={() => toggleColorMode()}>Change color mode</Button>
            <Button onClick={() => setLoading((loading) => !loading)}>
                Set loading
            </Button>
        </Wrapper>
    );
};

export default App;
