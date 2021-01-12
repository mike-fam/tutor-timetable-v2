import { Box, Center, Stack } from "@chakra-ui/react";
import React from "react";
import { FilterType } from "../../containers/requests/RequestContainer";
import { SimpleCheckboxList } from "../SimpleCheckboxList";

type Props = {
    setFilters: (item: FilterType, selected: boolean) => void;
};

export const RequestFilter: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <Box>
            <Center>filters</Center>
            <Center>
                <Stack>
                    <SimpleCheckboxList
                        elements={[FilterType.Permanent, FilterType.Temporary]}
                        selectFunc={props.setFilters}
                        helpTexts={[
                            "Display permanent requests",
                            "Display temporary requests",
                        ]}
                    />
                    <SimpleCheckboxList
                        elements={[FilterType.Cover, FilterType.Swap]}
                        selectFunc={props.setFilters}
                        helpTexts={[
                            "Display cover requests",
                            "Display swap requests",
                        ]}
                    />
                </Stack>
            </Center>
        </Box>
    );
};
