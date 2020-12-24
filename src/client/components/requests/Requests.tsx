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

export const Requests: React.FunctionComponent = () => {
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
                            <TabPanel>
                                <RequestList type={"open"} />
                            </TabPanel>
                            <TabPanel>
                                <RequestList type={"personal"} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

                <Stack w="15%">
                    <Center>
                        <h1>options</h1>
                    </Center>
                    <Box>
                        <RequestOptions />
                    </Box>
                    <Divider></Divider>
                    <Box>
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
