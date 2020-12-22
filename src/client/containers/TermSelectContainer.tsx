import React from "react";
import { Dropdown } from "../components/Dropdown";

type Props = {};

export const TermSelectContainer: React.FC<Props> = () => {
    return (
        <Dropdown onChange={(e) => console.log(e.target)}>
            {["test", "test"]}
        </Dropdown>
    );
};
