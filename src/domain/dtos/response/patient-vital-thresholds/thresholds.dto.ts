import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class ThresholdsDto {
    public thresholds: PatientVitalThresholdsDto[] = [];

    public users: UserDto[] = [];
}
