import React, { useContext, useEffect, useMemo } from "react";
import { RequestList } from "../../components/requests/RequestList";
import { RequestResponse } from "../../types/requests";
import { notSet } from "../../constants";
import { RequestContext } from "../../hooks/useRequestUtils";

// TODO: Needs user data and update filter function.
type Props = {
    filters: Array<(request: RequestResponse) => boolean>;
    termId: number;
};

export const RequestListContainer: React.FunctionComponent<Props> = ({
    filters,
    termId,
}) => {
    const { requests, fetchRequests, loading } = useContext(RequestContext);
    useEffect(() => {
        if (termId === notSet) {
            return;
        }
        fetchRequests(termId);
    }, [termId, fetchRequests]);
    const filteredRequestData = useMemo<RequestResponse[]>(() => {
        return filters.reduce(
            (data, filter) => data.filter(filter),
            requests.valueSeq().toArray()
        );
    }, [requests, filters]);

    return <RequestList requestList={filteredRequestData} loading={loading} />;
};
