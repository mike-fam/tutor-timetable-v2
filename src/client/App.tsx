import React, { useEffect, useState } from "react";
import axios from "axios";
import { TestContainer } from "./containers/TestContainer";
import { WeekNavContainer } from "./containers/WeekNavContainer";

const App = () => {
    const [testText, setTestText] = useState("");
    useEffect(() => {
        axios
            .get("/hello")
            .then((res) => {
                setTestText(res.data.test);
            })
            .catch((err) => setTestText(err.message));
    }, []);

    return (
        <div>
            <div>{testText}</div>
            <TestContainer />
            <WeekNavContainer />
        </div>
    );
};

export default App;
