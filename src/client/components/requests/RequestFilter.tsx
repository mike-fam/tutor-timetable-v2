import { Box, Center, Checkbox, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FilterType } from "../../containers/requests/RequestContainer";

type Props = {
    setFilters: (item: FilterType) => void;
};

export const RequestFilter: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Box>
            <Center>filters</Center>
            <Center>
                <Stack>
                    <Checkbox
                        onChange={() => props.setFilters(FilterType.Permanent)}
                    >
                        <Tooltip label="Display permanent requests">
                            Permanent
                        </Tooltip>
                    </Checkbox>
                    <Checkbox
                        onChange={() => props.setFilters(FilterType.Temporary)}
                    >
                        <Tooltip label="Display temporary requests">
                            Temporary
                        </Tooltip>
                    </Checkbox>
                    <Checkbox
                        onChange={() => props.setFilters(FilterType.Cover)}
                    >
                        <Tooltip label="Display cover requests">Cover</Tooltip>
                    </Checkbox>
                    <Checkbox
                        onChange={() => props.setFilters(FilterType.Swap)}
                    >
                        <Tooltip label="Display swap requests">Swap</Tooltip>
                    </Checkbox>
                </Stack>
            </Center>
        </Box>
    );
};
