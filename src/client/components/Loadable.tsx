import { Box, Spinner, useToast } from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";

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
    renderLoading = () => <Spinner size="xl" m="auto" display="block" />,
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
    return isLoading ? (
        <Box w="100%" h="100%" bg="red" p={2}>
            {renderLoading()}
        </Box>
    ) : (
        children
    );
};
