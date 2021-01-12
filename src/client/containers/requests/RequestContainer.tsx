import React from "react";
import { Role } from "../../../types/user";
import {
    RequestModal,
    RequestModalType,
} from "../../components/requests/RequestModal";
import { Requests } from "../../components/requests/Requests";

export enum DisplayRequestType {
    All = "All",
    Personal = "Personal",
}

export enum FilterType {
    Temporary = "Temporary",
    Permanent = "Permanent",
    Cover = "Cover",
    Swap = "Swap",
}

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
    //Filter management.
    const [filters, setFilters] = React.useState<Array<FilterType>>([]);

    const openRequestModal = (type: RequestModalType) => {
        setModalType(type);
        setModalToggle(true);
    };

    // Update list of filters.
    const updateFilters = (item: FilterType, selected: boolean) => {
        let tempArr: Array<FilterType> = [...filters];

        if (filters.indexOf(item) > -1 && !selected) {
            tempArr.splice(filters.indexOf(item), 1);
            setFilters(tempArr);
        } else if (filters.indexOf(item) === -1 && selected) {
            tempArr.push(item);
            setFilters(tempArr);
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
                userType={props.userType}
                type={modalType}
            />
        </>
    );
};
