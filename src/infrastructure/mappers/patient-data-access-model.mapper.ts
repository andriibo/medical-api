import {User} from 'domain/entities/user.entity';
import {PatientDataAccessStatus, PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessModel} from 'infrastructure/models';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';

export class PatientDataAccessEntityMapper implements IPatientDataAccessEntityMapper {
    public mapByPatientAndGrantedUser(patient: User, grantedUser: User): PatientDataAccess {
        const access = new PatientDataAccessModel();
        access.patientUserId = patient.id;
        access.grantedUserId = grantedUser.id;
        access.status = PatientDataAccessStatus.Initiated;

        return access;
    }
}
