import {ArgumentMetadata, PipeTransform} from '@nestjs/common';

export abstract class AbstractPipe implements PipeTransform {
    public transform(values: any, metadata: ArgumentMetadata): any {
        const {type} = metadata;
        if (this.isObj(values) && type === 'body') {
            return this.modify(values);
        }

        return values;
    }

    protected isObj(obj: any): boolean {
        return typeof obj === 'object' && obj !== null;
    }

    protected abstract modify(values: any): any;
}
