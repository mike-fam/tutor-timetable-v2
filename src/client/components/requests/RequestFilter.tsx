import { Box, Center, Stack } from "@chakra-ui/react";
import React from "react";
import { RequestStatus, RequestType } from "../../generated/graphql";
import { SimpleCheckboxList } from "../helpers/SimpleCheckboxList";

type Props = {
    setFilters: (item: RequestType | RequestStatus, selected: boolean) => void;
};

export const RequestFilter: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Box>
            <Center>filters</Center>
            <Center>
                <Stack>
                    <SimpleCheckboxList
                        elements={[
                            RequestType.Permanent,
                            RequestType.Temporary,
                        ]}
                        selectFunc={props.setFilters}
                        helpTexts={[
                            "Display permanent requests",
                            "Display temporary requests",
                        ]}
                        defaultSelectedAll={true}
                    />
                    <SimpleCheckboxList
                        elements={[RequestStatus.Open, RequestStatus.Closed]}
                        selectFunc={props.setFilters}
                        helpTexts={[
                            "Display open requests",
                            "Display closed requests",
                        ]}
                        defaultSelectedAll={true}
                    />
                </Stack>
            </Center>
        </Box>
    );
};
