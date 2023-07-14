import {PatientStatusEnum} from 'domain/constants/patient.const';
import {SetPatientStatusUseCase} from './set-patient-status.use-case';

export class PatientStatusAbnormalUseCase extends SetPatientStatusUseCase {
    public async setStatusAbnormal(patientUserId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(patientUserId);

        await this.patientStatusSpecification.assertUserCanSetAbnormal(user, patientStatus);

        await this.updatePatientStatusIfNeeded(patientStatus, PatientStatusEnum.Abnormal, user);
    }
}
