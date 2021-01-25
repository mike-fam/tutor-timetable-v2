import { Box, Center, Divider, Heading, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { CreateRequestModalContainer } from "../../containers/requests/CreateRequestModalContainer";
import { FilterType } from "../../containers/requests/RequestContainer";
import { RequestListContainer } from "../../containers/requests/RequestListContainer";
import { RequestFilter } from "./RequestFilter";
import { RequestList } from "./RequestList";
import { RequestModalType } from "./RequestModal";
import { RequestOptions } from "./RequestOptions";
import { CreateRequestModalContainerV2 } from "../../containers/requests/CreateRequestModalContainerV2";

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
                                {/*<CreateRequestModalContainer />*/}
                                <CreateRequestModalContainerV2 />
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
