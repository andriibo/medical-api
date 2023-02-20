import {ApiProperty} from '@nestjs/swagger';
import {UserView} from 'views/response/user';
import {PatientVitalThresholdsView} from 'views/response/patient-vital-thresholds/patient-vital-thresholds.view';
import {CurrentPatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/current-patient-vital-thresholds.dto';

export class CurrentPatientVitalThresholdsView extends CurrentPatientVitalThresholdsDto {
    @ApiProperty()
    public threshold: PatientVitalThresholdsView;

    @ApiProperty({isArray: true, type: UserView})
    public users: UserView[] = [];
}
