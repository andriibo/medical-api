import {UserDto} from 'domain/dtos/response/user/user.dto';
import {PatientDiagnosisDto} from 'domain/dtos/response/patient-diagnosis/patient-diagnosis.dto';

export class PatientDiagnosesDto {
    public diagnoses: PatientDiagnosisDto[];

    public users: UserDto[] = [];
}
