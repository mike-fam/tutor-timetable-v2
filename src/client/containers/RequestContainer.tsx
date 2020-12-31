import React from "react";
import { RequestModal } from "../components/requests/RequestModal";
import { Requests } from "../components/requests/Requests";

// Enforce typing later. Also not currently used as login backend is needed.
type Props = {
    userType: string;
};

export const RequestContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    //Modal stuff
    const [modalToggle, setModalToggle] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<string>("");
    //Filter management. Will use proper types later.
    const [filters, setFilters] = React.useState<Array<string>>([]);

    const openRequestModal = (type: string) => {
        setModalType(type);
        setModalToggle(true);
    };

    // Update list of filters.
    const updateFilters = (item: string) => {
        let tempArray: Array<string> = [...filters];

        if (filters.indexOf(item) > -1) {
            tempArray.splice(filters.indexOf(item), 1);
            setFilters(tempArray);
        } else {
            tempArray.push(item);
            setFilters(tempArray);
        }
    };

    return (
        <>
            <Requests
                toggleModal={openRequestModal}
                toggleFilters={updateFilters}
            />
            <RequestModal
                isOpen={modalToggle}
                toggle={setModalToggle}
                userType={"student"}
                type={modalType}
            />
        </>
    );
};
