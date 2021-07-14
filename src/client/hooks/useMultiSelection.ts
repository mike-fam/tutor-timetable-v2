import { useCallback, useState } from "react";
import { Set } from "immutable";

export const useMultiSelection = <T>() => {
    const [selected, setSelectedElems] = useState<Set<T>>(Set<T>());
    const select = useCallback((elem: T) => {
        setSelectedElems((prev) => prev.add(elem));
    }, []);
    const deselect = useCallback((elem: T) => {
        setSelectedElems((prev) => prev.remove(elem));
    }, []);
    return {
        selected,
        select,
        deselect,
    };
};
