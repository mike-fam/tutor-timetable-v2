import { registerDecorator, ValidationOptions } from "class-validator";
import { StreamTutorNumbersPattern } from "../resolvers/SessionStreamResolver";
import uniq from "lodash/uniq";
import intersection from "lodash/intersection";

export const UniqueExtraWeeks = (validationOptions?: ValidationOptions) => {
    return (
        object: { extraTutorNumRequirement: StreamTutorNumbersPattern[] },
        propertyName: string
    ) => {
        registerDecorator({
            name: "uniqueWeeks",
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions },
            validator: {
                validate(value: StreamTutorNumbersPattern[]) {
                    const cumulativeWeeks: number[] = [];
                    for (const pattern of value) {
                        const newWeeks = uniq(pattern.weeks);
                        if (
                            intersection(newWeeks, cumulativeWeeks).length > 0
                        ) {
                            return false;
                        }
                        cumulativeWeeks.push(...newWeeks);
                    }
                    return true;
                },
            },
        });
    };
};
