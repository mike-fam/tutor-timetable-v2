import React from "react";
import { Role } from "../../types/user";
import {
    RequestModal,
    RequestModalType,
} from "../components/requests/RequestModal";
import { Requests } from "../components/requests/Requests";

export enum DisplayRequestType {
    All = "All",
    Personal = "Personal",
}

// Enforce typing later. Also not currently used as login backend is needed.
type Props = {
    userType: Role;
};

export const RequestContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    //Modal stuff
    const [modalToggle, setModalToggle] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<RequestModalType>(
        RequestModalType.Create
    );
    //Filter management. Will use proper types later.
    const [filters, setFilters] = React.useState<Array<string>>([]);

    const openRequestModal = (type: RequestModalType) => {
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
                userType={Role.Staff}
                type={modalType}
            />
        </>
    );
};
