import { registerDecorator, ValidationOptions } from "class-validator";
import {
    MergedStreamInput,
    MergedStreamTutorNumbers,
} from "../resolvers/SessionStreamResolver";

export const UniqueWeeks = (validationOptions?: ValidationOptions) => {
    return (object: MergedStreamInput, propertyName: string) => {
        registerDecorator({
            name: "uniqueWeeks",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: MergedStreamTutorNumbers[]) {
                    const weeks = value.map((tutorNumber) => tutorNumber.week);
                    const uniqueWeeks = new Set(weeks);
                    return weeks.length === uniqueWeeks.size;
                },
            },
        });
    };
};
