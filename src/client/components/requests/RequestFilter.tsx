import { Box, Text, Stack, Divider } from "@chakra-ui/react";
import React from "react";
import { RequestStatus, RequestType } from "../../generated/graphql";
import { SimpleCheckboxList } from "../helpers/SimpleCheckboxList";

type Props = {
    setFilters: (item: RequestType | RequestStatus, selected: boolean) => void;
};

export const RequestFilter: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Box border="1px" borderColor="gray.300" borderRadius={5}>
            <Text fontSize="lg" fontWeight="bold" p={1} bg="gray.200">
                Filters
            </Text>
            <Stack p={1}>
                <SimpleCheckboxList
                    elements={[RequestType.Permanent, RequestType.Temporary]}
                    selectFunc={props.setFilters}
                    helpTexts={[
                        "Display permanent requests",
                        "Display temporary requests",
                    ]}
                    defaultSelectedAll={true}
                    selectAllLabel="Request Type"
                />
                <Divider />
                <SimpleCheckboxList
                    elements={[RequestStatus.Open, RequestStatus.Closed]}
                    selectFunc={props.setFilters}
                    helpTexts={[
                        "Display open requests",
                        "Display closed requests",
                    ]}
                    defaultSelectedAll={true}
                    selectAllLabel="Request Status"
                />
            </Stack>
        </Box>
    );
};
