import React from "react";
import { CreateRequestForm } from "../../components/requests/CreateRequestForm";

export const CreateRequestFormContainer: React.FunctionComponent = () => {
    const [selectedSessions, setSelectedSessions] = React.useState<
        Array<string>
    >([]);

    const updateSelectedSessions = (item: any) => {
        setSelectedSessions(item);
    };

    return (
        <CreateRequestForm
            updateSessions={updateSelectedSessions}
            sessions={selectedSessions}
        />
    );
};
