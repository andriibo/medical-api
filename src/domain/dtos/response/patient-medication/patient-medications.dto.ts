import {UserDto} from 'domain/dtos/response/user/user.dto';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';

export class PatientMedicationsDto {
    public medications: MedicationDto[];

    public users: UserDto[] = [];
}
