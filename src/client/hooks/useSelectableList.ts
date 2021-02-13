import { Set } from "immutable";
import { useCallback, useState } from "react";

export const useSelectableList = <T>(options: T[], defaultSelected = true) => {
    const [selected, setSelected] = useState<Set<T>>(
        defaultSelected ? Set(options) : Set()
    );
    const selectElem = useCallback(
        (elem: T, selected: boolean) => {
            setSelected((prev) =>
                selected ? prev.add(elem) : prev.remove(elem)
            );
        },
        [setSelected]
    );
    return {
        selected,
        setSelected,
        selectElem,
    };
};
