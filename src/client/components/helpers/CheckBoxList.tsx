import { Box, Checkbox, Stack, Tooltip } from "@chakra-ui/react";
import { Map, Set } from "immutable";

type Props<T extends string> = {
    selectAllLabel?: string;
    elements: Map<string, T>;
    helpTexts?: Map<string, string | undefined>;
    selectedElements: Set<string>;
    selectElement: (elementId: string, selected: boolean) => void;
    textDisplayed?: (element: T) => string;
};

export const CheckboxList = <T extends string>({
    selectAllLabel,
    elements,
    selectElement,
    selectedElements,
    helpTexts,
    textDisplayed,
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
            <Stack pl={6} mt={1} spacing={1} align="baseline">
                {elements
                    .map((element, id) => (
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
                                {textDisplayed?.(element) || element}
                            </Tooltip>
                        </Checkbox>
                    ))
                    .valueSeq()
                    .toArray()}
            </Stack>
        </Box>
    );
};
