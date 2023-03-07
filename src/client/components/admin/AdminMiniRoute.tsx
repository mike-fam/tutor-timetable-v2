import { ReactElement, FC, useContext, Component, ReactNode } from "react";
import { AdminPage } from "../../types/admin";
import { AdminPageContext } from "../../containers/admin/AdminPageContainer";

type Props = {
    page: AdminPage;
    component: ReactNode;
};

export const AdminMiniRoute: FC<Props> = ({ component, page }) => {
    const { currentPage } = useContext(AdminPageContext);
    if (page !== currentPage) {
        return null;
    }
    const Component = component;
    return <Component />;
};
