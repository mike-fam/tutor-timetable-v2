import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from "class-validator";
import { StreamStaffRequirement } from "../resolvers/SessionStreamResolver";
import uniq from "lodash/uniq";
import intersection from "lodash/intersection";
import difference from "lodash/difference";

export const UniqueExtraWeeks = (validationOptions?: ValidationOptions) => {
    return (
        object: { extraStaffRequirement: StreamStaffRequirement[] },
        propertyName: string
    ) => {
        registerDecorator({
            name: "uniqueWeeks",
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions },
            validator: {
                validate(value: StreamStaffRequirement[]) {
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
                defaultMessage(): string {
                    return "Duplicated weeks in extra requirements.";
                },
            },
        });
    };
};

export const ValidExtraWeeks = (validationOptions?: ValidationOptions) => {
    return (
        object: { extraStaffRequirement: StreamStaffRequirement[] },
        propertyName: string
    ) => {
        registerDecorator({
            name: "validExtraWeeks",
            target: object.constructor,
            propertyName: propertyName,
            options: { ...validationOptions },
            validator: {
                validate(
                    value: StreamStaffRequirement[],
                    args: ValidationArguments
                ) {
                    for (const pattern of value) {
                        if (
                            difference(
                                pattern.weeks,
                                (args.object as any).baseStaffRequirement.weeks
                            ).length > 0
                        ) {
                            return false;
                        }
                    }
                    return true;
                },
                defaultMessage(): string {
                    return "Week in extra requirement that does not appear in base requirement";
                },
            },
        });
    };
};
