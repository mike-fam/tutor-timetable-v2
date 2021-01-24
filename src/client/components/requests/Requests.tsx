import {
    Box,
    Center,
    Divider,
    Heading,
    HStack,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import React from "react";
import { CreateRequestModalContainer } from "../../containers/requests/CreateRequestModalContainer";
import {
    DisplayRequestType,
    FilterType,
} from "../../containers/requests/RequestContainer";
import { RequestFilter } from "./RequestFilter";
import { RequestList } from "./RequestList";
import { RequestModalType } from "./RequestModal";
import { RequestOptions } from "./RequestOptions";

type Props = {
    toggleModal: (type: RequestModalType) => void;
    toggleFilters: (item: FilterType, selected: boolean) => void;
};

export const Requests: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Box>
            <Center>
                <Heading>Request a swap</Heading>
            </Center>
            <br></br>
            {/* Each request item opens a modal */}
            <Box>
                <Center>
                    <HStack spacing={8} w="75%">
                        <Box
                            w="85%"
                            h="100%"
                            bg="tomato"
                            style={{ minHeight: "500px" }}
                        >
                            <Tabs isFitted>
                                <TabList>
                                    <Tab>All Requests</Tab>
                                    <Tab>Your Requests</Tab>
                                </TabList>

                                <TabPanels>
                                    {/* will likely use state management for these tabs later. */}
                                    <TabPanel>
                                        <RequestList
                                            type={DisplayRequestType.All}
                                            toggle={props.toggleModal}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <RequestList
                                            type={DisplayRequestType.Personal}
                                            toggle={props.toggleModal}
                                        />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>

                        <Stack w="15%">
                            <Center>
                                <h1>options</h1>
                            </Center>
                            <Box>
                                <CreateRequestModalContainer />
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
