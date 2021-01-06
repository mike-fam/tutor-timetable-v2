import React, { useCallback, useEffect, useState } from "react";
import { CheckboxList } from "./CheckboxList";
import { Map, Set } from "immutable";

type Props<T extends string> = {
    elements: T[];
    helpTexts?: string[];
    selectFunc: (elem: T, selected: boolean) => void;
    selectAllLabel?: string;
};

export const SimpleCheckboxList = <T extends string>({
    elements,
    helpTexts,
    selectFunc,
    selectAllLabel,
}: Props<T>) => {
    const [elementMap, setElementMap] = useState(Map<number, T>());
    const [helpTextMap, setHelpTextMap] = useState(
        Map<number, string | undefined>()
    );

    const [selectedElements, setSelectedElements] = useState(Set<number>());

    const selectElement = useCallback(
        (elementId: number, selected: boolean = true) => {
            setSelectedElements((prev) =>
                selected ? prev.add(elementId) : prev.remove(elementId)
            );
            selectFunc(elementMap.get(elementId)!, selected);
        },
        [elementMap, selectFunc]
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
            selectAllLabel={selectAllLabel}
        />
    );
};
