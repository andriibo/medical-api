import {ValueTransformer} from 'typeorm';

export class FloatTransformer implements ValueTransformer {
    public to(value?: number): string {
        return value?.toString();
    }

    public from(value?: string): number | null {
        return value ? Number.parseFloat(value) : null;
    }
}
