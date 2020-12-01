import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
    const [testText, setTestText] = useState("");
    useEffect(() => {
        axios.get("/hello").then(res => {
            setTestText(res.data.test)
        }).catch(err => setTestText(err.message));
    }, []);

    return (
        <div>{testText}</div>
    );
};

export default App;
