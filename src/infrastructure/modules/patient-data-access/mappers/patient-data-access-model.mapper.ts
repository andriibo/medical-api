import {User} from 'domain/entities/user.entity';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {PatientDataAccessStatusEnum} from 'domain/constants/patient-data-access.const';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {currentUnixTimestamp} from 'support/date.helper';

export class PatientDataAccessModelMapper implements IPatientDataAccessEntityMapper {
    public mapByPatientAndGrantedUser(patient: User, grantedUser: User): PatientDataAccess {
        const access = new PatientDataAccessModel();
        access.patientUserId = patient.id;
        access.grantedUserId = grantedUser.id;
        access.status = PatientDataAccessStatusEnum.Initiated;
        access.lastInviteSentAt = currentUnixTimestamp();

        return access;
    }

    public mapByPatientAndGrantedEmail(patient: User, grantedEmail: string): PatientDataAccess {
        const access = new PatientDataAccessModel();
        access.patientUserId = patient.id;
        access.grantedEmail = grantedEmail;
        access.status = PatientDataAccessStatusEnum.Initiated;
        access.lastInviteSentAt = currentUnixTimestamp();

        return access;
    }

    public mapByGrantedUserAndPatientEmail(doctor: User, patientEmail: string): PatientDataAccess {
        const access = new PatientDataAccessModel();
        access.grantedUserId = doctor.id;
        access.patientEmail = patientEmail;
        access.status = PatientDataAccessStatusEnum.Initiated;
        access.lastInviteSentAt = currentUnixTimestamp();

        return access;
    }
}
