import { useCallback, useState } from "react";
import { Map } from "immutable";

export const useMap = <T>() => {
    const [state, setState] = useState(Map<string, T>());
    const clear = useCallback(() => {
        setState((prev) => prev.clear());
    }, []);
    const set = useCallback((key: string, value: T) => {
        setState((prev) => prev.set(key, value));
    }, []);
    const setAll = useCallback(
        (keyValuePairs: [string, T][]) => {
            keyValuePairs.forEach(([key, value]) => {
                set(key, value);
            });
        },
        [set]
    );
    const replaceAll = useCallback(
        (keyValuePairs: [string, T][]) => {
            clear();
            setAll(keyValuePairs);
        },
        [clear, setAll]
    );
    const get = useCallback(
        (key: string) => {
            return state.get(key);
        },
        [state]
    );
    const remove = useCallback((key: string) => {
        setState((prev) => prev.remove(key));
    }, []);
    return {
        state,
        set,
        get,
        remove,
        clear,
        setAll,
        replaceAll,
    };
};
