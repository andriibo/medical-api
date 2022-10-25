import {ApiProperty} from '@nestjs/swagger';
import {DiagnosisDto} from 'domain/dtos/response/patient-diagnosis/diagnosis.dto';
import {UserView} from 'presentation/views/response/user';

export class DiagnosisView implements DiagnosisDto {
    @ApiProperty()
    public diagnosisId: string;

    @ApiProperty()
    public diagnosisName: string;

    @ApiProperty()
    public createdAt: string;

    @ApiProperty()
    public createdByUser: UserView;
}
