import React, { useMemo } from "react";
import { RequestList } from "../../components/requests/RequestList";
import {
    RequestStatus,
    RequestType,
    Term,
    useGetRequestsByCourseIdsQuery,
} from "../../generated/graphql";
import { useQueryWithError } from "../../hooks/useQueryWithError";
import { RequestResponse } from "../../types/requests";
import { UserState } from "../../types/user";

// TODO: Needs user data and update filter function.
type Props = {
    filters: Array<RequestType | RequestStatus>;
    user: UserState;
    currentTerm: Pick<Term, "id" | "startDate" | "endDate"> | null;
};

export enum TabViewType {
    ALL = 0,
    PERSONAL = 1,
}

export const RequestListContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    const [, setTabView] = React.useState<TabViewType>(TabViewType.ALL);

    const { loading, data, refetch } = useQueryWithError(
        useGetRequestsByCourseIdsQuery,
        {
            termId: 2,
            courseIds: [1, 2],
        }
    );

    //Handles filtering all requests.
    const filteredRequestData: Array<RequestResponse> = useMemo(() => {
        if (!data) {
            return [];
        }
        return data.getRequestsByCourseIds.filter((request) => {
            if (tabView === TabViewType.PERSONAL) {
                return (
                    props.filters.includes(request.type) &&
                    props.filters.includes(request.status) &&
                    request.session.sessionStream.timetable.termId ===
                        props.currentTerm?.id &&
                    request.requester.username === props.user.username
                );
            } else {
                return (
                    props.filters.includes(request.type) &&
                    props.filters.includes(request.status) &&
                    request.session.sessionStream.timetable.termId ===
                        props.currentTerm?.id
                );
            }
        });
    }, [
        data,
        props.currentTerm?.id,
        props.filters,
        props.user.username,
        tabView,
    ]);

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
