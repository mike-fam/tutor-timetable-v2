import React, { useEffect, useMemo } from "react";
import { RequestList } from "../../components/requests/RequestList";
import { useGetRequestsByTermIdLazyQuery } from "../../generated/graphql";
import { useLazyQueryWithError } from "../../hooks/useQueryWithError";
import { RequestResponse } from "../../types/requests";
import { notSet } from "../../constants";

// TODO: Needs user data and update filter function.
type Props = {
    filters: Array<(request: RequestResponse) => boolean>;
    termId: number;
};

export const RequestListContainer: React.FunctionComponent<Props> = ({
    filters,
    termId,
}) => {
    const [getRequests, { data, loading }] = useLazyQueryWithError(
        useGetRequestsByTermIdLazyQuery
    );
    useEffect(() => {
        if (termId === notSet) {
            return;
        }
        getRequests({
            variables: {
                termId,
            },
        });
    }, [termId, getRequests]);
    const filteredRequestData = useMemo<RequestResponse[]>(() => {
        if (!data) {
            return [];
        }
        return filters.reduce(
            (data, filter) => data.filter(filter),
            data.getRequestsByTermId
        );
    }, [data, filters]);

    return <RequestList requestList={filteredRequestData} loading={loading} />;
};
