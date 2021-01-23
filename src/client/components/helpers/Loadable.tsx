import React, { ReactElement } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

type Props = {
    isLoading: boolean;
    renderLoading?: () => ReactElement;
    children: ReactElement;
};

export const Loadable: React.FC<Props> = ({
    isLoading,
    renderLoading = () => <LoadingSpinner />,
    children,
}) => {
    return isLoading ? renderLoading() : children;
};
