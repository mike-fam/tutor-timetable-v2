import React, { useCallback, useEffect, useState } from "react";
import { Map, Set } from "immutable";
import { CheckboxList } from "./CheckBoxList";
import { v4 as uuid } from "uuid";

type Props<T extends string> = {
    elements: T[];
    helpTexts?: string[];
    selectFunc: (elem: T, selected: boolean) => void;
    selectAllLabel?: string;
    defaultSelectedAll?: boolean;
    textDisplayed?: (element: T) => string;
};

export const SimpleCheckboxList = <T extends string>({
    elements,
    helpTexts,
    selectFunc,
    selectAllLabel,
    defaultSelectedAll,
    textDisplayed,
}: Props<T>) => {
    const [setupDefault, setSetupDefault] = useState(true);
    const [elementMap, setElementMap] = useState(Map<string, T>());
    const [helpTextMap, setHelpTextMap] = useState(
        Map<string, string | undefined>()
    );

    const [selectedElements, setSelectedElements] = useState(Set<string>());

    const selectElement = useCallback(
        (elementId: string, selected: boolean = true) => {
            setSelectedElements((prev) =>
                selected ? prev.add(elementId) : prev.remove(elementId)
            );
            selectFunc(elementMap.get(elementId)!, selected);
        },
        [elementMap, selectFunc]
    );

    // setup props to pass to checkbox list
    useEffect(() => {
        elements.forEach((element, index) => {
            const key = uuid();
            setElementMap((prev) => prev.set(key, element));
            setHelpTextMap((prev) => prev.set(key, helpTexts?.[index]));
            if (defaultSelectedAll && setupDefault) {
                selectFunc(element, true);
                setSelectedElements((prev) => prev.add(key));
            }
        });
        setSetupDefault(false);
    }, [elements, helpTexts, defaultSelectedAll, setupDefault, selectFunc]);

    return (
        <CheckboxList<T>
            elements={elementMap}
            selectedElements={selectedElements}
            selectElement={selectElement}
            helpTexts={helpTextMap}
            selectAllLabel={selectAllLabel}
            textDisplayed={textDisplayed}
        />
    );
};
