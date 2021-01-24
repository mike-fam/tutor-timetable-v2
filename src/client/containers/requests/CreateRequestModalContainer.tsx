import React from "react";
import { CreateRequestForm } from "../../components/requests/CreateRequestForm";
import { RequestModal } from "../../components/requests/RequestModal";
import { Map } from "immutable";
import { RequestFormOptions } from "../../../types/request";
import { Button, Center, useDisclosure } from "@chakra-ui/react";

export const CreateRequestModalContainer: React.FunctionComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedSessions, setSelectedSessions] = React.useState<
        Array<string>
    >([]);

    const initMap = Map<RequestFormOptions, string>();

    const [formData, setFormData] = React.useState<
        Map<RequestFormOptions, string>
    >(initMap);

    const courseList = ["CSSE1001", "CSSE2002", "CSSE3002"];
    const sessionList = ["T01", "T02", "P01", "P02"];
    const semester = "Semester 1, 2021";

    // Stops values from persisting after closing modal.
    const handleModalClose = () => {
        setFormData(initMap);
        setSelectedSessions([]);
        onClose();
    };

    const updateSelectedSessions = (item: Array<string> | string) => {
        if (item instanceof Array) {
            setSelectedSessions(item);
        } else {
            setSelectedSessions([item]);
        }
    };

    const updateFormData = (key: RequestFormOptions, value: string) => {
        if (Object.values(RequestFormOptions).includes(key)) {
            setFormData(formData.set(key, value));
            console.log(formData);
        }
    };

    return (
        <>
            <Center>
                <Button onClick={onOpen}>New Request</Button>
            </Center>
            <RequestModal
                renderHeader={() => <p>Create A New Request - {semester}</p>}
                renderBody={() => (
                    <CreateRequestForm
                        updateForm={updateFormData}
                        updateSessions={updateSelectedSessions}
                        formData={formData}
                        sessionList={sessionList}
                        courseList={courseList}
                        sessionPrefs={selectedSessions}
                    />
                )}
                renderFooterButton={() => <Button>Submit</Button>}
                isOpen={isOpen}
                onClose={handleModalClose}
            />
        </>
    );
};
