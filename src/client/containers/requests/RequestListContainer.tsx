import React from "react";
import { RequestList } from "../../components/requests/RequestList";
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
    const [, setTabView] = React.useState<TabViewType>(TabViewType.ALL);

    const testList = [0, 1, 2, 3, 4, 5];

    return (
        <>
            <RequestList requestList={testList} setTabListView={setTabView} />
        </>
    );
};
