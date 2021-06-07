export const isNumeric = (str: string): boolean => {
    if (str === "") {
        return false;
    }
    return !isNaN(+str);
};
