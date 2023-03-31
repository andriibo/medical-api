import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {isISO8601} from 'class-validator';

@Injectable()
export class ParseDateISO8601Pipe implements PipeTransform {
    private dateFields = ['dob'];

    public transform(values: any, metadata: ArgumentMetadata): any {
        const {type} = metadata;
        if (this.isObj(values) && type === 'body') {
            return this.parse(values);
        }

        return values;
    }

    private isObj(obj: any): boolean {
        return typeof obj === 'object' && obj !== null;
    }

    private parse(values: any): any {
        Object.keys(values).forEach((key) => {
            if (this.isObj(values[key])) {
                values[key] = this.parse(values[key]);
            } else if (this.dateFields.includes(key) && typeof values[key] === 'string' && !isISO8601(values[key])) {
                throw new BadRequestException(`${key} must be a valid ISO 8601 date string.`);
            }
        });

        return values;
    }
}
