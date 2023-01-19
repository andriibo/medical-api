import {PipeTransform, Injectable} from '@nestjs/common';
import {SyncVitalDto} from 'domain/dtos/request/vital';

@Injectable()
export class VitalNormalizationPipe implements PipeTransform<SyncVitalDto, SyncVitalDto> {
    public transform(model: SyncVitalDto) {
        model.vitals.forEach((vital) => {
            vital.hr = this.normilizeValue(vital.hr, 0, 250);
            vital.rr = this.normilizeValue(vital.rr, 0, 100);
            vital.spo = this.normilizeValue(vital.spo, 0, 100);
            vital.temperature = this.normilizeValue(vital.temperature, 0, 100);
        });

        return model;
    }

    private normilizeValue(value: number | null, min: number, max: number): number | null {
        if (value !== null && value >= max) {
            return max;
        }
        if (value !== null && value <= min) {
            return min;
        }

        return value;
    }
}
