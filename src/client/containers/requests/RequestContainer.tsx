import React, { useCallback, useContext, useMemo } from "react";
import { Requests } from "../../components/requests/Requests";
import {
    RequestStatus,
    RequestType,
    useTermsQuery,
} from "../../generated/graphql";
import { getCurrentTerm } from "../../utils/term";
import { UserContext } from "../../utils/user";

export enum DisplayRequestType {
    All = "All",
    Personal = "Personal",
}

export const RequestContainer: React.FunctionComponent = () => {
    //Filter management.
    const [filters, setFilters] = React.useState<
        Array<RequestType | RequestStatus>
    >([]);

    const { data } = useTermsQuery();

    const { user } = useContext(UserContext);

    // Get Current Term
    const currentTerm = useMemo(() => {
        if (!data) {
            return null;
        }
        return getCurrentTerm(data.terms);
    }, [data]);

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
            <Requests
                toggleFilters={updateFilters}
                filters={filters}
                user={user}
                currentTerm={currentTerm}
            />
        </>
    );
};
