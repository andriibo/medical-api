import {PatientStatusEnum} from 'domain/constants/patient.const';
import {SetPatientStatusUseCase} from './set-patient-status.use-case';

export class PatientStatusNormalUseCase extends SetPatientStatusUseCase {
    public async setStatusNormal(patientUserId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(patientUserId);

        await this.patientStatusSpecification.assertUserCanSetNormal(user, patientStatus);

        await this.updatePatientStatusIfNeeded(patientStatus, PatientStatusEnum.Normal, user);
    }
}
