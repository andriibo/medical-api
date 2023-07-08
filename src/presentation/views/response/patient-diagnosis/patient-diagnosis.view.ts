import {ApiProperty} from '@nestjs/swagger';
import {PatientDiagnosisDto} from 'domain/dtos/response/patient-diagnosis/patient-diagnosis.dto';
import {UserView} from 'presentation/views/response/user';

export class PatientDiagnosisView implements PatientDiagnosisDto {
    @ApiProperty()
    public diagnosisId: string;

    @ApiProperty()
    public diagnosisName: string;

    @ApiProperty()
    public createdAt: string;

    @ApiProperty()
    public createdByUser: UserView;
}
