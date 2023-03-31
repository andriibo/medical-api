import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

export const IS_GREATER_THAN = 'isGreaterThan';

export function IsGreaterThanValidator(property: string, validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: IS_GREATER_THAN,
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments): boolean {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];

                    return typeof value === 'number' && typeof relatedValue === 'number' && value > relatedValue;
                },
            },
        });
    };
}
