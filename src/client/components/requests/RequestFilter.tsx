import { Center, Checkbox, Stack, Tooltip } from "@chakra-ui/react";
import React from "react";

type Props = {
    setFilters: Function;
};

export const RequestFilter: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
            <Center>filters</Center>
            <Center>
                <Stack>
                    <Checkbox onChange={() => props.setFilters("swap")}>
                        <Tooltip label="Display swapping requests">
                            Swap
                        </Tooltip>
                    </Checkbox>
                    <Checkbox onChange={() => props.setFilters("Cover")}>
                        <Tooltip label="Display covering requests">
                            Cover
                        </Tooltip>
                    </Checkbox>
                    <Checkbox onChange={() => props.setFilters("Permanent")}>
                        <Tooltip label="Display permanent requests">
                            Permanent
                        </Tooltip>
                    </Checkbox>
                    <Checkbox onChange={() => props.setFilters("Temporary")}>
                        <Tooltip label="Display temporary requests">
                            Temporary
                        </Tooltip>
                    </Checkbox>
                </Stack>
            </Center>
        </div>
    );
};
