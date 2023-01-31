import {PatientDto} from 'domain/dtos/response/profile/patient.dto';

export class MyPatientDto extends PatientDto {
    public accessId: string;

    public lastConnected: number | null = null;

    public category: string;
}
