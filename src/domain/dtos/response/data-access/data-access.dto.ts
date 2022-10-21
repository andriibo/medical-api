import {UserDto} from 'domain/dtos/response/user/user.dto';
import {PatientDataAccess} from 'domain/entities';

export class DataAccessDto {
    public accessId: string;

    public direction: string;

    public status: string;

    public createdAt: string;

    public requestedUser?: UserDto;

    public static fromPatientDataAccess(patientDataAccess: PatientDataAccess): DataAccessDto {
        const dto = new DataAccessDto();
        dto.accessId = patientDataAccess.id;
        dto.direction = patientDataAccess.direction;
        dto.status = patientDataAccess.status;
        dto.createdAt = patientDataAccess.createdAt;

        return dto;
    }
}
