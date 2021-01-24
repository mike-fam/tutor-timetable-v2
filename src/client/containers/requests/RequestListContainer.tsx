import React from "react";
import { RequestList } from "../../components/requests/RequestList";
import { FilterType } from "./RequestContainer";

type Props = {
    filters: Array<FilterType>;
};

export const RequestListContainer: React.FunctionComponent<Props> = (
    props: Props
) => {
    const [tabView, setTabView] = React.useState<boolean>(false);

    const testList = [0, 1, 2, 3, 4, 5];

    return (
        <>
            <RequestList requestList={testList} setTabListView={setTabView} />
        </>
    );
};
