import {User} from 'domain/entities/user.entity';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {PatientStatusEnum} from 'domain/constants/patient.const';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {currentUnixTimestamp} from 'support/date.helper';

export class PatientStatusModelMapper implements IPatientStatusEntityMapper {
    public mapByPatientAndStatus(patient: User, status: PatientStatusEnum): PatientStatus {
        const patientStatus = new PatientStatusModel();
        patientStatus.patientUserId = patient.id;
        patientStatus.status = status;
        patientStatus.setAt = currentUnixTimestamp();

        return patientStatus;
    }
}
