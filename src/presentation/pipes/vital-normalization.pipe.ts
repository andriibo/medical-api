import {PipeTransform, Injectable} from '@nestjs/common';
import {SyncVitalsDto} from 'domain/dtos/request/vital';

@Injectable()
export class VitalNormalizationPipe implements PipeTransform<SyncVitalsDto, SyncVitalsDto> {
    public transform(model: SyncVitalsDto) {
        model.vitals.forEach((vital) => {
            vital.hr = this.normilizeValue(vital.hr, 0, 250);
            vital.rr = this.normilizeValue(vital.rr, 0, 100);
            vital.spo2 = this.normilizeValue(vital.spo2, 0, 100);
            vital.temp = this.normilizeValue(vital.temp, 0, 100);
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
