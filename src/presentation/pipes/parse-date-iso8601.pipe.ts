import {BadRequestException, Injectable} from '@nestjs/common';
import {isISO8601} from 'class-validator';
import {AbstractPipe} from 'presentation/pipes/abstract.pipe';

@Injectable()
export class ParseDateISO8601Pipe extends AbstractPipe {
    private dateFields = ['dob'];

    protected modify(values: any): any {
        Object.keys(values).forEach((key) => {
            if (this.isObj(values[key])) {
                values[key] = this.modify(values[key]);
            } else if (this.dateFields.includes(key) && typeof values[key] === 'string' && !isISO8601(values[key])) {
                throw new BadRequestException(`${key} must be a valid ISO 8601 date string.`);
            }
        });

        return values;
    }
}
