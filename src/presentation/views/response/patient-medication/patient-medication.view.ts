import {ApiProperty} from '@nestjs/swagger';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';
import {UserView} from 'presentation/views/response/user';
import {MedicationView} from 'views/response/medication';

export class PatientMedicationView extends MedicationView implements MedicationDto {
    @ApiProperty()
    public medicationId: string;

    @ApiProperty()
    public createdAt: string;

    @ApiProperty()
    public createdByUser: UserView;
}
