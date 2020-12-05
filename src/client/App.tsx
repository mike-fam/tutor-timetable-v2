import React from "react";
import { Dropdown } from "./components/Dropdown";
import { Wrapper } from "./components/Wrapper";

const App = () => {
    return (
        <Wrapper>
            <Dropdown onChange={(e) => console.log(e.target.value)}>
                {["s2 2019", "s1 2020", "s2 2020", "s1 2021"]}
            </Dropdown>
        </Wrapper>
    );
};

export default App;
