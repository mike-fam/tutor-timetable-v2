import {
    Button,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
} from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

type Props = {
    elements: [string, string][];
    selectedElements: string[];
    setSelectedElements: (keys: string[]) => any;
};

export const MultiSelect: FC<Props> = ({
    elements,
    selectedElements,
    setSelectedElements,
}) => {
    const selectedElemsRepr = useMemo(() => {
        return elements
            .filter(([key]) => selectedElements.includes(key))
            .map(([_, elem]) => elem)
            .join(", ");
    }, [elements, selectedElements]);
    return (
        <Menu closeOnSelect={false} boundary="clippingParents" isLazy>
            <MenuButton
                as={Button}
                variant="outline"
                w="25ch"
                rightIcon={<ChevronDownIcon />}
                size="sm"
            >
                {selectedElemsRepr.substr(0, 18)}
                {selectedElemsRepr.length >= 18 && "..."}
            </MenuButton>
            <MenuList w="20ch" maxH="20vh" overflow="auto">
                <MenuOptionGroup
                    type="checkbox"
                    value={selectedElements}
                    onChange={(values) => {
                        setSelectedElements(values as string[]);
                    }}
                >
                    {elements.map(([elemKey, elem]) => (
                        <MenuItemOption key={elemKey} value={elemKey}>
                            {elem}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
};
