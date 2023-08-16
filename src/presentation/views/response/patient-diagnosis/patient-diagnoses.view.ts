import {ApiProperty} from '@nestjs/swagger';
import {UserView} from 'views/response/user';
import {PatientDiagnosisView} from 'views/response/patient-diagnosis/patient-diagnosis.view';
import {PatientDiagnosesDto} from 'domain/dtos/response/patient-diagnosis/patient-diagnoses.dto';

export class PatientDiagnosesView implements PatientDiagnosesDto {
    @ApiProperty({isArray: true, type: PatientDiagnosisView})
    public diagnoses: PatientDiagnosisView[] = [];

    @ApiProperty({isArray: true, type: UserView})
    public users: UserView[] = [];
}
