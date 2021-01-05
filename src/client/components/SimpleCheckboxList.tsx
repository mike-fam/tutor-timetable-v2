import React, { useCallback, useEffect, useState } from "react";
import { CheckboxList } from "./CheckboxList";
import { Map, Set } from "immutable";

type Props = {
    elements: string[];
    helpTexts?: string[];
    selectElem: (elem: string, selected: boolean) => void;
};

export const SimpleCheckboxList: React.FC<Props> = ({
    elements,
    helpTexts,
}) => {
    const [elementMap, setElementMap] = useState(Map<number, string>());
    const [helpTextMap, setHelpTextMap] = useState(
        Map<number, string | undefined>()
    );

    const [selectedElements, setSelectedElements] = useState(Set<number>());

    const selectElement = useCallback(
        (elementId: number, selected: boolean = true) => {
            setSelectedElements((prev) =>
                selected ? prev.add(elementId) : prev.remove(elementId)
            );
        },
        []
    );

    // setup props to pass to checkbox list
    useEffect(() => {
        elements.forEach((element, key) => {
            setElementMap((prev) => prev.set(key, element));
            setHelpTextMap((prev) => prev.set(key, helpTexts?.[key]));
        });
    }, [elements, helpTexts]);

    return (
        <CheckboxList
            elements={elementMap}
            selectedElements={selectedElements}
            selectElement={selectElement}
            helpTexts={helpTextMap}
        />
    );
};
