export const promiseHandler = async <T>(
    promise: Promise<T>
): Promise<[T?, unknown?]> => {
    try {
        return [await promise, undefined];
    } catch (e) {
        return [undefined, e];
    }
};
