import React from "react";
import { Spinner } from "@chakra-ui/react";

type Props = {};

export const LoadingSpinner: React.FC<Props> = () => {
    return (
        <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
        />
    );
};
