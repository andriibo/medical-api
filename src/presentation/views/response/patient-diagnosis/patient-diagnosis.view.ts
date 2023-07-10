import {ApiProperty} from '@nestjs/swagger';
import {PatientDiagnosisDto} from 'domain/dtos/response/patient-diagnosis/patient-diagnosis.dto';

export class PatientDiagnosisView implements PatientDiagnosisDto {
    @ApiProperty()
    public diagnosisId: string;

    @ApiProperty()
    public diagnosisName: string;

    @ApiProperty()
    public createdBy: string;

    @ApiProperty()
    public createdAt: string;
}
