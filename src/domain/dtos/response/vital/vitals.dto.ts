import {VitalDto} from './vital.dto';
import {Vital} from 'domain/entities';
import {ThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/thresholds.dto';

export class VitalsDto extends ThresholdsDto {
    public vitals: VitalDto[] = [];

    public static fromVitals(vitals: Vital[]): VitalsDto {
        const dto = new VitalsDto();
        dto.vitals = vitals.map((vital) => VitalDto.fromVital(vital));

        return dto;
    }
}
