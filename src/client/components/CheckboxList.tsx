import React from "react";
import { Box, Checkbox, Stack, Tooltip } from "@chakra-ui/react";
import { Map, Set } from "immutable";

type Props<T extends string> = {
    selectAllLabel?: string;
    elements: Map<number, string>;
    helpTexts?: Map<number, string | undefined>;
    selectedElements: Set<number>;
    selectElement: (elementId: number, selected: boolean) => void;
};

export const CheckboxList = <T extends string>({
    selectAllLabel,
    elements,
    selectElement,
    selectedElements,
    helpTexts,
}: Props<T>) => {
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
                {selectAllLabel ? selectAllLabel : "Select All"}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {elements.map((element, id) => (
                    <Checkbox
                        // https://github.com/chakra-ui/chakra-ui/issues/2428#issuecomment-724002563
                        isChecked={selectedElements.contains(id)}
                        onChange={(e) => {
                            selectElement(id, e.target.checked);
                        }}
                        key={id}
                    >
                        <Tooltip
                            label={
                                helpTexts?.get(id)
                                    ? helpTexts.get(id)
                                    : `Select ${element}`
                            }
                        >
                            {element}
                        </Tooltip>
                    </Checkbox>
                ))}
            </Stack>
        </Box>
    );
};
