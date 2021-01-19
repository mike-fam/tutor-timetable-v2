import React from "react";
import { CreateRequestForm } from "../../components/requests/CreateRequestForm";

export const CreateRequestFormContainer: React.FunctionComponent = () => {
    const [selectedSessions, setSelectedSessions] = React.useState<
        Array<string>
    >([]);

    const [selectedCourse, setSelectedCourse] = React.useState<string>("");
    const [sessionSwitch, setSessionSwitch] = React.useState<string>("");

    const updateSelectedSessions = (item: Array<string> | string) => {
        if (item instanceof Array) {
            setSelectedSessions(item);
        } else {
            setSelectedSessions([item]);
        }
    };

    const courseList = ["CSSE1001", "CSSE2002", "CSSE3002"];
    const sessionList = ["T01", "T02", "P01", "P02"];

    return (
        <CreateRequestForm
            updateCourse={setSelectedCourse}
            selectedCourse={selectedCourse}
            updateSwitch={setSessionSwitch}
            updateSessions={updateSelectedSessions}
            sessionPrefs={selectedSessions}
            sessionList={sessionList}
            courseList={courseList}
        />
    );
};
