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
            <br></br>
            <CourseSelectContainer />
            <br></br>
            <WeekNavContainer />
        </div>
    );
};

export default App;
