export const promiseHandler = async <T>(
    promise: Promise<T>
): Promise<[T?, Error?]> => {
    try {
        return [await promise, undefined];
    } catch (e) {
        return [undefined, e];
    }
};
