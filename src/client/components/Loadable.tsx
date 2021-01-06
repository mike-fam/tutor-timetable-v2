import { useToast } from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

type Props = {
    isLoading: boolean;
    renderLoading?: () => ReactElement;
    error?: {
        name: string;
        message: string;
    };
    children: ReactElement;
};

export const Loadable: React.FC<Props> = ({
    isLoading,
    renderLoading = () => <LoadingSpinner />,
    error,
    children,
}) => {
    const toast = useToast();
    useEffect(() => {
        if (!error) {
            return;
        }
        toast({
            title: error.name,
            description: error.message,
            duration: 7,
            isClosable: true,
            position: "bottom",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);
    return isLoading ? renderLoading() : children;
};
