import {UserDto} from 'domain/dtos/response/user/user.dto';
import {PatientDataAccess} from 'domain/entities';

export class DataAccessDto {
    accessId: string;

    direction: string;

    status: string;

    createdAt: string;

    requestedUser: UserDto;

    static fromPatientDataAccess(patientDataAccess: PatientDataAccess): DataAccessDto {
        const dto = new DataAccessDto();
        dto.accessId = patientDataAccess.accessId;
        dto.direction = patientDataAccess.direction;
        dto.status = patientDataAccess.status;
        dto.createdAt = patientDataAccess.createdAt;

        return dto;
    }
}
