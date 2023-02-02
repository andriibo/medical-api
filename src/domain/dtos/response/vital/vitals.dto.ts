import {VitalDto} from './vital.dto';
import {Vital} from 'domain/entities';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';

export class VitalsDto {
    public vitals: VitalDto[] = [];

    public thresholds: PatientVitalThresholdsDto[] = [];

    public static fromVitals(vital: Vital[]): VitalsDto {
        const dto = new VitalsDto();
        dto.vitals = vital.map((vital) => VitalDto.fromVital(vital));

        return dto;
    }
}
