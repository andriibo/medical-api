import {Injectable} from '@nestjs/common';
import {AbstractPipe} from 'presentation/pipes/abstract.pipe';

@Injectable()
export class TrimPipe extends AbstractPipe {
    protected modify(values: any): any {
        Object.keys(values).forEach((key) => {
            if (this.isObj(values[key])) {
                values[key] = this.modify(values[key]);
            } else if (typeof values[key] === 'string') {
                values[key] = values[key].trim();
            }
        });

        return values;
    }
}
