import React from "react";
import { Box, Checkbox, Stack } from "@chakra-ui/react";
import { Map, Set } from "immutable";

type Props = {
    selectAllLabel?: string;
    elements: Map<number, string>;
    selectedElements: Set<number>;
    selectElement: (elementId: number, selected: boolean) => void;
};

export const CheckboxList: React.FunctionComponent<Props> = ({
    selectAllLabel = "All Elements",
    elements,
    selectElement,
    selectedElements,
}) => {
    return (
        <Box>
            <Checkbox
                isChecked={selectedElements.size === elements.size}
                onChange={(e) => {
                    elements.forEach((_, id) => {
                        selectElement(id, e.target.checked);
                    });
                }}
                isIndeterminate={
                    selectedElements.size !== elements.size &&
                    selectedElements.size !== 0
                }
            >
                {selectAllLabel}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {elements.map((course, id) => (
                    <Checkbox
                        // https://github.com/chakra-ui/chakra-ui/issues/2428#issuecomment-724002563
                        isChecked={selectedElements.contains(id)}
                        onChange={(e) => {
                            selectElement(id, e.target.checked);
                        }}
                        key={id}
                    >
                        {course}
                    </Checkbox>
                ))}
            </Stack>
        </Box>
    );
};
