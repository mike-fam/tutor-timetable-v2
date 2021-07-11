import React from "react";
import { Center, Text } from "@chakra-ui/react";
import { Wrapper } from "./components/helpers/Wrapper";

type Props = {};

export const PermissionDenied: React.FC<Props> = () => {
    return (
        <Wrapper>
            <Center>
                <Text fontSize="6xl" color="tomato">
                    Oopsie, it seems like you don&apos;t have permission to
                    visit this page
                </Text>
            </Center>
        </Wrapper>
    );
};
