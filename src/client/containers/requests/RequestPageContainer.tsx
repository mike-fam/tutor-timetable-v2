import React, { useCallback, useContext, useMemo } from "react";
import { Requests } from "../../components/requests/Requests";
import { notSet } from "../../constants";
import {
    RequestStatus,
    RequestType,
    useTermsQuery,
} from "../../generated/graphql";
import { getCurrentTerm } from "../../utils/term";
import { UserContext } from "../../utils/user";
import { Wrapper } from "../../components/helpers/Wrapper";

export enum DisplayRequestType {
    All = "All",
    Personal = "Personal",
}

export const RequestPageContainer: React.FunctionComponent = () => {
    //Filter management.
    const [filters, setFilters] = React.useState<
        Array<RequestType | RequestStatus>
    >([]);

    const { data } = useTermsQuery();

    const { user } = useContext(UserContext);

    // Get Current Term
    const currentTerm = useMemo(() => {
        if (!data) {
            return notSet;
        }
        return getCurrentTerm(data.terms).id;
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
        <Wrapper>
            <Requests
                toggleFilters={updateFilters}
                filters={filters}
                user={user}
                currentTerm={currentTerm}
            />
        </Wrapper>
    );
};
