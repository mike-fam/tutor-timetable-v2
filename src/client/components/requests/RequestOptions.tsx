import { Button, Center, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
    // modal stuff.
    toggle: Function;
};

export const RequestOptions: React.FunctionComponent<Props> = (
    props: Props
) => {
    return (
        <>
            <VStack spacing={1} align="stretch">
                <Center>
                    <Button w="50%" onClick={() => props.toggle("create")}>
                        New Request
                    </Button>
                </Center>
                <Center>
                    <Button w="50%">button2</Button>
                </Center>
                <Center>
                    <Button w="50%">button 3</Button>
                </Center>
            </VStack>
        </>
    );
};
