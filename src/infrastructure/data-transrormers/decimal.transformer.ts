import {ValueTransformer} from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
    to(decimal?: number): string {
        return decimal?.toString();
    }

    from(decimal?: string): number | null {
        return decimal ? Number.parseFloat(decimal) : null;
    }
}
