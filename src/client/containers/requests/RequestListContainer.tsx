import React, { useMemo } from "react";
import { RequestList } from "../../components/requests/RequestList";
import {
    RequestStatus,
    RequestType,
    useGetRequestsByCourseIdsQuery,
} from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { RequestResponse } from "../../types/requests";

type Props = {
    filters: Array<RequestType | RequestStatus>;
};

export enum TabViewType {
    ALL = 0,
    PERSONAL = 1,
}

export const RequestListContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    const [tabView, setTabView] = React.useState<TabViewType>(TabViewType.ALL);

    const { loading, data, refetch } = useQueryWithError(
        useGetRequestsByCourseIdsQuery,
        {
            courseIds: [1, 2],
        }
    );

    const filteredRequestData: Array<RequestResponse> = useMemo(() => {
        if (!data) {
            return [];
        }
        return data.getRequestsByCourseIds.filter(
            (request) =>
                props.filters.includes(request.type) &&
                props.filters.includes(request.status)
        );
    }, [data, props.filters]);

    const handleTabChange = (tab: TabViewType) => {
        if (tabView !== tab) {
            setTabView(1 - tabView);
            refetch();
        }
    };

    return (
        <>
            <RequestList
                requestList={filteredRequestData}
                loading={loading}
                setTabListView={handleTabChange}
            />
        </>
    );
};
