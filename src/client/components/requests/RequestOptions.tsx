import { Button, Center, VStack } from "@chakra-ui/react";
import React from "react";
import { RequestModalType } from "./RequestModal";

type Props = {
    // modal stuff.
    toggle: (type: RequestModalType) => void;
};

export const RequestOptions: React.FunctionComponent<Props> = (
    props: Props
) => {
    return (
        <>
            <VStack spacing={1} align="stretch">
                <Center>
                    <Button
                        onClick={() => props.toggle(RequestModalType.Create)}
                    >
                        New Request
                    </Button>
                </Center>
            </VStack>
        </>
    );
};
