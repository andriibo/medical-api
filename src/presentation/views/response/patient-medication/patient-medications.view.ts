import {ApiProperty} from '@nestjs/swagger';
import {UserView} from 'views/response/user';
import {PatientMedicationsDto} from 'domain/dtos/response/patient-medication/patient-medications.dto';
import {PatientMedicationView} from 'views/response/patient-medication/patient-medication.view';

export class PatientMedicationsView extends PatientMedicationsDto {
    @ApiProperty({isArray: true, type: PatientMedicationView})
    public medications: PatientMedicationView[] = [];

    @ApiProperty({isArray: true, type: UserView})
    public users: UserView[] = [];
}
