import React, { useCallback, useEffect, useState } from "react";
import { Map, Set } from "immutable";
import { CheckboxList } from "./CheckBoxList";

type Props<T extends string> = {
    elements: T[];
    helpTexts?: string[];
    selectFunc: (elem: T, selected: boolean) => void;
    selectAllLabel?: string;
    defaultSelectedAll?: boolean;
};

export const SimpleCheckboxList = <T extends string>({
    elements,
    helpTexts,
    selectFunc,
    selectAllLabel,
    defaultSelectedAll,
}: Props<T>) => {
    const [setupDefault, setSetupDefault] = useState(true);
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
            if (defaultSelectedAll && setupDefault) {
                selectFunc(element, true);
                setSelectedElements((prev) => prev.add(key));
            }
        });
        setSetupDefault(false);
    }, [elements, helpTexts, defaultSelectedAll, setupDefault, selectFunc]);

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
