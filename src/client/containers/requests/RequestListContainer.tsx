import React, { useMemo } from "react";
import { RequestList } from "../../components/requests/RequestList";
import {
    RequestStatus,
    RequestType,
    useGetRequestsByCourseIdsQuery,
} from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { RequestResponse } from "../../types/requests";
import { UserState } from "../../types/user";

// TODO: Needs user data and update filter function.
type Props = {
    filters: Array<(request: RequestResponse) => boolean>;
    user: UserState;
    termId: number;
};

export enum TabViewType {
    ALL = 0,
    PERSONAL = 1,
}

export const RequestListContainer: React.FunctionComponent<Props> = ({
    filters,
    termId,
}) => {
    const { loading, data, refetch } = useQueryWithError(
        useGetRequestsByCourseIdsQuery,
        {
            termId: 2,
            courseIds: [1, 2],
        }
    );

    return <RequestList requestList={filteredRequestData} loading={loading} />;
};
