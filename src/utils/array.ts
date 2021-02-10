export const asyncMap = async <T, R>(
    array: Array<T>,
    predicate: (elem: T) => Promise<R>
) => {
    return await Promise.all(array.map(predicate));
};
