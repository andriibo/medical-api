import {User} from 'domain/entities/user.entity';
import {PatientDataAccessStatus, PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessModel} from 'infrastructure/models';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';

export class PatientDataAccessEntityMapper implements IPatientDataAccessEntityMapper {
    public mapByPatientAndGrantedUser(patient: User, grantedUser: User): PatientDataAccess {
        const access = new PatientDataAccessModel();
        access.patientUserId = patient.id;
        access.grantedUserId = grantedUser.id;
        access.status = PatientDataAccessStatus.Initiated;

        return access;
    }

    public mapByPatientAndGrantedEmail(patient: User, email: string): PatientDataAccess {
        const access = new PatientDataAccessModel();
        access.patientUserId = patient.id;
        access.grantedEmail = email;
        access.status = PatientDataAccessStatus.Initiated;

        return access;
    }

    public mapByGrantedUserAndPatientEmail(doctor: User, email: string): PatientDataAccess {
        const access = new PatientDataAccessModel();
        access.grantedUserId = doctor.id;
        access.patientEmail = email;
        access.status = PatientDataAccessStatus.Initiated;

        return access;
    }
}
