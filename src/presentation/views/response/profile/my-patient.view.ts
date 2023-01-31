import {ApiProperty} from '@nestjs/swagger';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {PatientView} from 'views/response/user';
import {PatientCategoryEnum} from 'domain/entities/patient-category.entity';

export class MyPatientView extends PatientView implements MyPatientDto {
    @ApiProperty()
    public accessId: string;

    @ApiProperty({nullable: true})
    public lastConnected: number | null;

    @ApiProperty({enum: PatientCategoryEnum, nullable: true})
    public category: string | null;
}
