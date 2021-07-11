import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from "class-validator";

export const IsGreaterThan = (
    property: string,
    validationOptions?: ValidationOptions
) => {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: "isGreaterThan",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[
                        relatedPropertyName
                    ];
                    return (
                        typeof value === "number" &&
                        typeof relatedValue === "number" &&
                        value > relatedValue
                    );
                },
            },
        });
    };
};

export const IsLessThan = (
    property: string,
    validationOptions?: ValidationOptions
) => {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: "isLessThan",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[
                        relatedPropertyName
                    ];
                    return (
                        typeof value === "number" &&
                        typeof relatedValue === "number" &&
                        value < relatedValue
                    );
                },
            },
        });
    };
};
