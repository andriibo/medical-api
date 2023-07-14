import {ApiProperty} from '@nestjs/swagger';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {PatientView} from 'views/response/user';
import {PatientStatusEnum} from 'domain/constants/patient.const';

export class MyPatientView extends PatientView implements MyPatientDto {
    @ApiProperty()
    public accessId: string;

    @ApiProperty({nullable: true})
    public lastConnected: number | null;

    @ApiProperty({enum: PatientStatusEnum})
    public status: PatientStatusEnum;
}
