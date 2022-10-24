import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsUUID} from 'class-validator';
import {PatientDiagnosisDto} from 'domain/dtos/request/patient-diagnosis/patient-diagnosis.dto';

export class CreateDiagnosisView extends PatientDiagnosisDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public patientUserId: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(2, 100)
    public diagnosisName: string;
}
