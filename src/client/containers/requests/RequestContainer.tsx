import React, { useCallback } from "react";
import { Role } from "../../../server/types/user";
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
    const updateFilters = useCallback(
        (item: RequestType | RequestStatus, selected: boolean) => {
            if (selected && !filters.includes(item)) {
                setFilters((prev) => [...prev, item]);
            } else if (!selected && filters.includes(item)) {
                setFilters((prev) => prev.filter((value) => value !== item));
            }
        },
        [filters]
    );

    return (
        <>
            <Requests toggleFilters={updateFilters} filters={filters} />
        </>
    );
};
