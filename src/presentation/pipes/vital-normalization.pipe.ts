import {PipeTransform, Injectable} from '@nestjs/common';
import {SyncVitalsDto} from 'domain/dtos/request/vital';

@Injectable()
export class VitalNormalizationPipe implements PipeTransform<SyncVitalsDto, SyncVitalsDto> {
    public transform(model: SyncVitalsDto): SyncVitalsDto {
        model.vitals.forEach((vital) => {
            vital.hr = this.normalizeValue(vital.hr, 0, 250);
            vital.rr = this.normalizeValue(vital.rr, 0, 100);
            vital.spo2 = this.normalizeValue(vital.spo2, 0, 100);
            vital.temp = this.normalizeValue(vital.temp, 0, 100);
        });

        return model;
    }

    private normalizeValue(value: number | null, min: number, max: number): number | null {
        if (value !== null && value >= max) {
            return max;
        }
        if (value !== null && value <= min) {
            return min;
        }

        return value;
    }
}
