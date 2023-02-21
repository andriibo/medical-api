import {VitalDto} from './vital.dto';
import {Vital} from 'domain/entities';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class VitalsDto {
    public vitals: VitalDto[] = [];

    public thresholds: PatientVitalThresholdsDto[] = [];

    public users: UserDto[] = [];

    public static fromVitals(vitals: Vital[]): VitalsDto {
        const dto = new VitalsDto();
        dto.vitals = vitals.map((vital) => VitalDto.fromVital(vital));

        return dto;
    }
}
