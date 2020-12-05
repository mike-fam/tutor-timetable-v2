import { Divider } from "@chakra-ui/react";
import React from "react";
import { Dropdown } from "./components/Dropdown";
import { CourseSelectContainer } from "./containers/CourseSelectContainer";
import { WeekNavContainer } from "./containers/WeekNavContainer";

const App = () => {
    return (
        <div>
            <Dropdown onChange={(e) => console.log(e.target.value)}>
                {["s2 2019", "s1 2020", "s2 2020", "s1 2021"]}
            </Dropdown>
            <Divider />
            <CourseSelectContainer />
            <Divider />
            <WeekNavContainer />
        </div>
    );
};

export default App;
