import { Box, Center, Divider, Heading, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { RequestListContainer } from "../../containers/requests/RequestListContainer";
import { RequestStatus, RequestType, Term } from "../../generated/graphql";
import { UserState } from "../../types/user";
import { RequestFilter } from "./RequestFilter";
import { CreateRequestButton } from "../../containers/requests/CreateRequestModalContainerV3";

type Props = {
    toggleFilters: (
        item: RequestType | RequestStatus,
        selected: boolean
    ) => void;
    filters: Array<RequestType | RequestStatus>;
    user: UserState;
    currentTerm: number;
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
                            w="100%"
                            h="100%"
                            style={{
                                minHeight: "700px",
                                border: "1px solid black",
                            }}
                        >
                            <RequestListContainer
                                filters={props.filters}
                                user={props.user}
                                currentTerm={props.currentTerm}
                            />
                        </Box>

                        <Stack>
                            <Center>
                                <h1>options</h1>
                            </Center>
                            <Box>
                                <CreateRequestButton />
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
