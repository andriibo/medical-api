import {Vital} from 'domain/entities';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class VitalsDto {
    public vitals: any[][] = [];

    public thresholds: PatientVitalThresholdsDto[] = [];

    public users: UserDto[] = [];

    public static fromVitals(vitals: Vital[]): VitalsDto {
        const dto = new VitalsDto();
        dto.vitals = vitals.map((vital) => {
            return [
                vital.id,
                vital.thresholdsId,
                vital.timestamp,
                vital.temp,
                vital.isTempNormal,
                vital.hr,
                vital.isHrNormal,
                vital.spo2,
                vital.isSpo2Normal,
                vital.fall,
            ];
        });

        return dto;
    }
}
