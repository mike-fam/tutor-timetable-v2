import clone from "lodash/clone";
import entries from "lodash/entries";
import parseISO from "date-fns/parseISO";
import isValid from "date-fns/isValid";

export const convertDataToHaveDates = (obj: any): any => {
    const objCopy = clone(obj);
    for (const [key, value] of entries(obj)) {
        if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            value !== null
        ) {
            objCopy[key] = convertDataToHaveDates(value);
        } else if (Array.isArray(value) && value != null) {
            objCopy[key] = value.map((elem) => convertDataToHaveDates(elem));
        } else if (typeof value === "string") {
            const date = parseISO(value);
            if (!isValid(date)) {
                continue;
            }
            objCopy[key] = date;
        }
    }
    return objCopy;
};

export const sanitiseVariableWithDates = (variables: any): any => {
    const varCopy = clone(variables);
    for (const [key, value] of entries(varCopy)) {
        if (value instanceof Date) {
            varCopy[key] = value.toISOString();
        } else if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            value !== null
        ) {
            varCopy[key] = sanitiseVariableWithDates(value);
        }
    }
    return varCopy;
};
