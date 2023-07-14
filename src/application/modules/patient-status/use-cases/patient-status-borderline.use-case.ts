import {PatientStatusEnum} from 'domain/constants/patient.const';
import {currentUnixTimestamp} from 'support/date.helper';
import {SetPatientStatusUseCase} from './set-patient-status.use-case';

export class PatientStatusBorderlineUseCase extends SetPatientStatusUseCase {
    public async setStatusBorderline(patientUserId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(patientUserId);

        await this.patientStatusSpecification.assertUserCanSetBorderline(user, patientStatus);

        await this.updatePatientStatusIfNeeded(patientStatus, PatientStatusEnum.Borderline, user);

        if (patientStatus.status === PatientStatusEnum.Borderline) {
            return;
        }

        patientStatus.status = PatientStatusEnum.Borderline;
        patientStatus.setBy = user.id;
        patientStatus.setAt = currentUnixTimestamp();

        await this.patientStatusRepository.persist(patientStatus);
    }
}
