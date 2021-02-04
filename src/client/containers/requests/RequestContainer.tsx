import React from "react";
import { Role } from "../../../server/types/user";
import {
    RequestModal,
    RequestModalType,
} from "../../components/requests/RequestModal";
import { Requests } from "../../components/requests/Requests";
import { RequestStatus, RequestType } from "../../generated/graphql";

export enum DisplayRequestType {
    All = "All",
    Personal = "Personal",
}

type Props = {
    userType: Role;
};

export const RequestContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    //Filter management.
    const [filters, setFilters] = React.useState<
        Array<RequestType | RequestStatus>
    >([]);

    // Update list of filters.
    const updateFilters = (
        item: RequestType | RequestStatus,
        selected: boolean
    ) => {
        let tempArr: Array<RequestType | RequestStatus> = [...filters];

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
            <Requests toggleFilters={updateFilters} filters={filters} />
        </>
    );
};
