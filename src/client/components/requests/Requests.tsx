import {
    Box,
    Center,
    Checkbox,
    Divider,
    Heading,
    HStack,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { RequestList } from "./RequestList";
import { RequestOptions } from "./RequestOptions";

type Props = {
    toggleModal: Function;
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
                                    type={"all"}
                                    toggle={props.toggleModal}
                                />
                            </TabPanel>
                            <TabPanel>
                                <RequestList
                                    type={"personal"}
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
                        {/* maybe put filters into its own component */}
                        <Center>filters</Center>
                        <Center>
                            <Stack>
                                <Checkbox>
                                    <Tooltip label="Display swapping requests">
                                        Swap
                                    </Tooltip>
                                </Checkbox>
                                <Checkbox>
                                    <Tooltip label="Display covering requests">
                                        Cover
                                    </Tooltip>
                                </Checkbox>
                                <Checkbox>
                                    <Tooltip label="Display permanent requests">
                                        Permanent
                                    </Tooltip>
                                </Checkbox>
                                <Checkbox>
                                    <Tooltip label="Display temporary requests">
                                        Temporary
                                    </Tooltip>
                                </Checkbox>
                            </Stack>
                        </Center>
                    </Box>
                </Stack>
            </HStack>
        </Box>
    );
};
