import {ApiProperty} from '@nestjs/swagger';
import {PatientStatusDto} from 'domain/dtos/response/patient-status/patient-status.dto';

export class PatientStatusView implements PatientStatusDto {
    @ApiProperty()
    public status: string;

    @ApiProperty({nullable: true})
    public setAt: number | null;
}
