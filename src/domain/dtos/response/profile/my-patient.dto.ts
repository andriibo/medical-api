import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {PatientStatusEnum} from 'domain/constants/patient.const';

export class MyPatientDto extends PatientDto {
    public accessId: string;

    public lastConnected: number | null;

    public status: PatientStatusEnum;

    public category: PatientStatusEnum;
}
