import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
    const returnValue = useState<T>(() => {
        const savedValue = localStorage.getItem(key);
        if (!savedValue) {
            return initialValue;
        }
        const savedValueParsed = JSON.parse(savedValue);
        return savedValueParsed as T;
    });
    const [value] = returnValue;
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
    return returnValue;
};
