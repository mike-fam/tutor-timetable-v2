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
