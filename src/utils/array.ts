import asyncFilter from "node-filter-async";

export const asyncMap = async <T, R>(
    array: Array<T>,
    predicate: (elem: T) => Promise<R>
) => {
    return await Promise.all(array.map(predicate));
};

export const asyncSome = async <T>(
    array: Array<T>,
    predicate: (elem: T) => Promise<boolean>
) => {
    return (await asyncFilter(array, predicate)).length !== 0;
};

export const asyncForEach = async <T>(
    array: Array<T>,
    callback: (elem: T) => any
): Promise<void> => {
    await Promise.all(array.map(async (e) => await callback(e)));
};

export const getAllIndices = <T>(
    seq: Iterable<T> | ArrayLike<T>,
    predicate: T | ((elem: T) => boolean)
): Array<number> => {
    const result = [];
    const arr = Array.from(seq);
    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        if (predicate instanceof Function) {
            if (predicate(elem)) {
                result.push(i);
            }
        } else {
            if (elem === predicate) {
                result.push(i);
            }
        }
    }
    return result;
};

export const updateElementAtIndex = <T>(
    array: T[],
    index: number,
    value: T
) => {
    const copy = [...array];
    copy[index] = value;
    return copy;
};

export const removeAtIndex = <T>(array: T[], index: number) => {
    return array.filter((_, arrIndex) => arrIndex !== index);
};
