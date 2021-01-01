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
import {
    DisplayRequestType,
    FilterType,
} from "../../containers/RequestContainer";
import { RequestFilter } from "./RequestFilter";
import { RequestList } from "./RequestList";
import { RequestModalType } from "./RequestModal";
import { RequestOptions } from "./RequestOptions";

type Props = {
    toggleModal: (type: RequestModalType) => void;
    toggleFilters: (item: FilterType) => void;
};

export const Requests: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Box>
            <Center>
                <Heading>Request a swap</Heading>
            </Center>
            {/* Each request item opens a modal */}
            <HStack spacing={8} style={{ marginLeft: "10%" }}>
                <Box w="75%" h="100%" bg="tomato">
                    <Tabs>
                        <TabList>
                            <Tab>Open Requests</Tab>
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
                        <RequestOptions toggle={props.toggleModal} />
                    </Box>
                    <Divider></Divider>
                    <Box>
                        <RequestFilter setFilters={props.toggleFilters} />
                    </Box>
                </Stack>
            </HStack>
        </Box>
    );
};
