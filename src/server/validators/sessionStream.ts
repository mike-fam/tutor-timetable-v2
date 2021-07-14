import { registerDecorator, ValidationOptions } from "class-validator";
import {
    MergedStreamInput,
    StreamTutorNumbersPattern,
} from "../resolvers/SessionStreamResolver";

export const UniqueWeeks = (validationOptions?: ValidationOptions) => {
    return (
        object: { numberOfTutorsForWeeks: StreamTutorNumbersPattern[] },
        propertyName: string
    ) => {
        registerDecorator({
            name: "uniqueWeeks",
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: "Multiple of the same weeks specified",
            },
            validator: {
                validate(value: StreamTutorNumbersPattern[]) {
                    const weeks = value.map((tutorNumber) => tutorNumber.week);
                    const uniqueWeeks = new Set(weeks);
                    return weeks.length === uniqueWeeks.size;
                },
            },
        });
    };
};
