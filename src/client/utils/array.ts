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
