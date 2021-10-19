import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export function useSetState<S>(
    initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>, boolean];
export function useSetState<S = undefined>(): [
    S | undefined,
    Dispatch<SetStateAction<S | undefined>>,
    boolean
];

/**
 * useState but with boolean value checking if the state has been updated once
 *
 * @param {T} initialState initial state
 * @returns {[T, Dispatch<SetStateAction<T>>, boolean]} what useState returns,
 * but with a boolean checking if state has been updated yet
 * @template T
 */
export function useSetState(initialState?: any): any {
    const [state, setState] = useState(initialState);
    const [updated, setUpdated] = useState(false);
    const updatedRef = useRef(false);
    useEffect(() => {
        if (updatedRef.current) {
            setUpdated(true);
        }
        if (!updatedRef.current) {
            updatedRef.current = true;
        }
    }, [state]);
    return [state, setState, updated];
}
