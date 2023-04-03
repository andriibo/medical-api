import {buildMessage, ValidateBy, ValidationOptions} from 'class-validator';

export const MAX_DATE = 'maxDate';
export const MIN_DATE = 'minDate';

function isMaxDate(date: unknown, maxDate: Date): boolean {
    const dateObject = getDateObject(date);

    return dateObject instanceof Date && dateObject.getTime() <= maxDate.getTime();
}

function isMinDate(date: unknown, minDate: Date): boolean {
    const dateObject = getDateObject(date);

    return dateObject instanceof Date && dateObject.getTime() >= minDate.getTime();
}

function getDateObject(date: unknown): Date {
    return typeof date === 'string' ? new Date(date) : <Date>date;
}

export function MaxDate(date: Date, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_DATE,
            constraints: [date],
            validator: {
                validate: (value, args): boolean => isMaxDate(value, args.constraints[0]),
                defaultMessage: buildMessage(
                    (eachPrefix) => `maximal allowed date for ${eachPrefix}$property is $constraint1`,
                    validationOptions,
                ),
            },
        },
        validationOptions,
    );
}

export function MinDate(date: Date, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MIN_DATE,
            constraints: [date],
            validator: {
                validate: (value, args): boolean => isMinDate(value, args.constraints[0]),
                defaultMessage: buildMessage(
                    (eachPrefix) => `minimal allowed date for ${eachPrefix}$$property is $constraint1`,
                    validationOptions,
                ),
            },
        },
        validationOptions,
    );
}
