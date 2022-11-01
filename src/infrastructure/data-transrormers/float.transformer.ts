import {ValueTransformer} from 'typeorm';

export class FloatTransformer implements ValueTransformer {
    to(value?: number): string {
        return value?.toString();
    }

    from(value?: string): number | null {
        return value ? Number.parseFloat(value) : null;
    }
}
