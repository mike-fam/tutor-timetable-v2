import { Box, Center, Divider, Heading, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { FilterType } from "../../containers/requests/RequestContainer";
import { RequestListContainer } from "../../containers/requests/RequestListContainer";
import { RequestFilter } from "./RequestFilter";
import { CreateRequestButtonContainer } from "../../containers/requests/CreateRequestButtonContainer";

type Props = {
    toggleFilters: (item: FilterType, selected: boolean) => void;
    filters: Array<FilterType>;
};

export const Requests: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Box>
            <Center>
                <Heading>Request a swap</Heading>
            </Center>
            <br></br>

            <Box>
                <Center>
                    <HStack spacing={8} w="75%">
                        <Box
                            w="85%"
                            h="100%"
                            bg="tomato"
                            style={{ minHeight: "500px" }}
                        >
                            <RequestListContainer filters={props.filters} />
                        </Box>

                        <Stack w="15%">
                            <Center>
                                <h1>options</h1>
                            </Center>
                            <Box>
                                <CreateRequestButtonContainer />
                            </Box>
                            <Divider></Divider>
                            <Box>
                                <RequestFilter
                                    setFilters={props.toggleFilters}
                                />
                            </Box>
                        </Stack>
                    </HStack>
                </Center>
            </Box>
        </Box>
    );
};
