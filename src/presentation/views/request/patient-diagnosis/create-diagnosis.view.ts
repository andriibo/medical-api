import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsUUID} from 'class-validator';
import {DiagnosisDto} from 'domain/dtos/request/patient-diagnosis/diagnosis.dto';

export class CreateDiagnosisView extends DiagnosisDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public patientUserId: string;

    @ApiProperty({minLength: 2, maxLength: 100})
    @IsNotEmpty()
    @Length(2, 100)
    public diagnosisName: string;
}
