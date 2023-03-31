import {ValidationOptions, ValidateBy, buildMessage} from 'class-validator';

export const MAX_DATE = 'maxDate';

/**
 * Checks if the value is a date that's after the specified date.
 */
export function maxDate(date: unknown, maxDate: Date): boolean {
    const dateObject: Date = typeof date === 'string' ? new Date(date) : <Date>date;

    return dateObject instanceof Date && dateObject.getTime() <= maxDate.getTime();
}

export function MaxDate(date: Date, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_DATE,
            constraints: [date],
            validator: {
                validate: (value, args): boolean => maxDate(value, args.constraints[0]),
                defaultMessage: buildMessage(
                    (eachPrefix) => 'maximal allowed date for ' + eachPrefix + '$property is $constraint1',
                    validationOptions,
                ),
            },
        },
        validationOptions,
    );
}
