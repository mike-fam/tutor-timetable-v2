import React from "react";
import { RequestList } from "../../components/requests/RequestList";
import {
    RequestStatus,
    useGetRequestsByCourseIdsQuery,
} from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { FilterType } from "./RequestContainer";

type Props = {
    filters: Array<FilterType>;
};

export enum TabViewType {
    ALL = 0,
    PERSONAL = 1,
}

export const RequestListContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    const [tabView, setTabView] = React.useState<TabViewType>(TabViewType.ALL);

    const [requestData, setRequestData] = React.useState<
        Array<{
            title: string;
            status: RequestStatus;
            session: string;
            user: string;
            preferences: Array<string>;
        }>
    >();

    const { loading, data, refetch } = useQueryWithError(
        useGetRequestsByCourseIdsQuery,
        {
            courseIds: [1, 2],
        }
    );

    const handleTabChange = (tab: TabViewType) => {
        if (tabView !== tab) {
            setTabView(1 - tabView);
            refetch();
        }
    };

    return (
        <>
            <RequestList
                requestList={data}
                loading={loading}
                setTabListView={handleTabChange}
            />
        </>
    );
};
