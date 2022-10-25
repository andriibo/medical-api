import {ApiProperty} from '@nestjs/swagger';
import {DiagnosisDto} from 'domain/dtos/response/diagnosis/diagnosis.dto';

export class DiagnosisView implements DiagnosisDto {
    @ApiProperty()
    public diagnosisName: string;
}
