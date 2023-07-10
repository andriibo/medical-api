import {UpdateDiagnosisDto} from 'domain/dtos/request/patient-diagnosis/update-diagnosis.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Length} from 'class-validator';

export class UpdateDiagnosisView extends UpdateDiagnosisDto {
    @ApiProperty({minLength: 2, maxLength: 100})
    @IsNotEmpty()
    @Length(2, 100)
    public diagnosisName: string;
}
