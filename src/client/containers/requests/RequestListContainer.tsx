import React from "react";
import { RequestList } from "../../components/requests/RequestList";
import {
    RequestStatus,
    RequestType,
    useGetRequestsByCourseIdsQuery,
} from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useQueryWithError";

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

    const [requestData, setRequestData] = React.useState<Array<any>>([]);

    const { loading, data, refetch } = useQueryWithError(
        useGetRequestsByCourseIdsQuery,
        {
            courseIds: [1, 2],
        }
    );

    const handleTabChange = (tab: TabViewType) => {
        if (tabView !== tab) {
            setTabView(1 - tabView);
            filterRequestData();
            refetch();
        }
    };

    const filterRequestData = () => {
        let temp: any[] = [];
        let filtered: Array<Array<any>> = [];
        if (props.filters.length > 0 && data) {
            for (let filter of props.filters) {
                if (Object.keys(RequestType).includes(filter)) {
                    filtered.push(
                        data.getRequestsByCourseIds.filter(
                            (item) =>
                                item.type.toLowerCase() === filter.toLowerCase()
                        )
                    );
                }
                if (Object.keys(RequestStatus).includes(filter)) {
                    filtered.push(
                        data.getRequestsByCourseIds.filter(
                            (item) =>
                                item.status.toLowerCase() ===
                                filter.toLowerCase()
                        )
                    );
                }
            }
            temp = filtered.reduce((a, b) => a.filter((c) => b.includes(c)));

            setRequestData([...temp]);
            console.log(requestData);
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
