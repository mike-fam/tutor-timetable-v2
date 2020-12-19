import React, { useContext } from "react";
import { Dropdown } from "../components/Dropdown";
import { TimetableContext } from "../utils/timetable";
import { TimetableState } from "../types/timetable";

type Props = {};

export const TermSelectContainer: React.FC<Props> = ({}) => {
    const { terms, setTerm } = useContext<TimetableState>(TimetableContext);
    return (
        <Dropdown onChange={(e) => setTerm(e.target.value)}>
            {["test", "test"]}
        </Dropdown>
    );
};
