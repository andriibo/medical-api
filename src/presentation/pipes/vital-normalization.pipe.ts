import {PipeTransform, Injectable, ArgumentMetadata} from '@nestjs/common';
import {SyncVitalDto} from 'domain/dtos/request/vital';

@Injectable()
export class VitalNormalizationPipe implements PipeTransform<SyncVitalDto, SyncVitalDto> {
    public transform(model: SyncVitalDto, metadata: ArgumentMetadata) {
        model.vitals.forEach((vital) => {
            vital.hr = this.normilizeValue(vital.hr, 20, 200);
            vital.rr = this.normilizeValue(vital.rr, 30, 100);
            vital.spo = this.normilizeValue(vital.spo, 80, 100);
            vital.temperature = this.normilizeValue(vital.temperature, 30, 50);
        });

        return model;
    }

    private normilizeValue(value: number, min: number, max: number): number {
        if (value >= max) {
            return max;
        }
        if (value <= min) {
            return min;
        }

        return value;
    }
}
