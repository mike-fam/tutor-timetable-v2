import {
    Box,
    Center,
    Flex,
    Grid,
    Heading,
    HStack,
    Stack,
} from "@chakra-ui/react";
import React from "react";
import { RequestListContainer } from "../../containers/requests/RequestListContainer";
import { RequestStatus, RequestType } from "../../generated/graphql";
import { UserState } from "../../types/user";
import { RequestFilter } from "./RequestFilter";
import { CreateRequestButtonContainer } from "../../containers/requests/CreateRequestButtonContainer";

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
            <Grid templateColumns="1fr 5fr" templateRows="auto" gap={6}>
                <Box spacing={8} gridRow="3 / 5" gridColumn={1}>
                    <RequestFilter setFilters={props.toggleFilters} />
                </Box>
                <Heading gridRow={1} gridColumn={2}>
                    Requests
                </Heading>
                <Flex gridRow={2} gridColumn={2} justifyContent="flex-end">
                    <CreateRequestButtonContainer />
                </Flex>
                <Box gridRow={3} gridColumn={2}>
                    <RequestListContainer
                        filters={props.filters}
                        user={props.user}
                        currentTerm={props.currentTerm}
                    />
                </Box>
            </Grid>
        </Box>
    );
};
