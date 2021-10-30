import { useCallback, useRef } from "react";

export const useFocus = <T extends HTMLElement>() => {
    const focusRef = useRef<T>(null);
    const setFocus = useCallback(() => {
        focusRef.current?.focus();
    }, []);
    return { focusRef, setFocus };
};
