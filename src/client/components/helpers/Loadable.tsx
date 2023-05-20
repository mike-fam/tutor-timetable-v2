import { FC, PropsWithChildren, ReactElement } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

type Props = {
    isLoading: boolean;
    renderLoading?: () => ReactElement;
};

export const Loadable: FC<PropsWithChildren<Props>> = ({
    isLoading,
    renderLoading = () => <LoadingSpinner />,
    children,
}) => {
    return isLoading ? renderLoading() : <>{children}</>;
};
