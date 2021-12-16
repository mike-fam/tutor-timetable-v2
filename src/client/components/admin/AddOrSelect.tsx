import { FC, useEffect, useState } from "react";
import { Map } from "immutable";
import { Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { Dropdown } from "../helpers/Dropdown";
import { defaultStr } from "../../constants";
import { AdminPage } from "../../types/admin";

type Props = {
    elementType: AdminPage;
    elements: [string, string][];
    onAdd: () => void;
    onSelect: (value: string) => void;
    selectedValue?: string;
};

export const AddOrSelect: FC<Props> = ({
    elementType,
    onAdd,
    onSelect,
    elements,
    selectedValue,
}) => {
    const [elementMap, setElementMap] = useState(Map<string, string>());
    useEffect(() => {
        setElementMap((prev) => prev.clear());
        elements.forEach(([id, value]) => {
            setElementMap((prev) => prev.set(id, value));
        });
    }, [elements]);

    return (
        <>
            <FormControl mt={3}>
                <FormLabel>Choose a {elementType}:</FormLabel>
                <Dropdown
                    options={elementMap}
                    elementType={elementType}
                    onChange={(e) => onSelect(e.target.value)}
                    value={selectedValue || defaultStr}
                />
            </FormControl>
            <Text my={2}>or</Text>
            <Button colorScheme="green" onClick={onAdd}>
                Add a new {elementType}
            </Button>
        </>
    );
};
