import {User} from 'domain/entities/user.entity';
import {PatientDataAccessStatus, PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessModel} from 'presentation/models';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';

export class PatientDataAccessEntityMapper implements IPatientDataAccessEntityMapper {
    mapByPatientAndGrantedUser(patient: User, grantedUser: User): PatientDataAccess {
        const access = new PatientDataAccessModel();
        access.patientUserId = patient.userId;
        access.grantedUserId = grantedUser.userId;
        access.status = PatientDataAccessStatus.Initiated;

        return access;
    }
}