import {ApiProperty} from '@nestjs/swagger';
import {MyPatientStatusDto} from 'domain/dtos/response/patient-status/my-patient-status.dto';

export class MyPatientStatusView implements MyPatientStatusDto {
    @ApiProperty()
    public status: string;

    @ApiProperty()
    public setAt: number;
}
