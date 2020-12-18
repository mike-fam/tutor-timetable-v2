import values from "lodash/values";

export const checkFieldValueInEnum = <T extends any>(
    enumType: T,
    fieldName: string,
    isNumber: boolean = false
) => {
    return values(enumType)
        .filter((member) => !isNumber || typeof member === "number")
        .map(
            (member) => `"${fieldName}" = ${isNumber ? member : `'${member}'`}`
        )
        .join(" OR ");
};
