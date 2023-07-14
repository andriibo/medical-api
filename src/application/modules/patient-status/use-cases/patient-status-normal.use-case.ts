import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientStatusEnum} from 'domain/constants/patient.const';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';
import {currentUnixTimestamp} from 'support/date.helper';

export class PatientStatusNormalUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
        private readonly patientStatusSpecification: PatientStatusSpecification,
    ) {}

    public async setStatusNormal(patientUserId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(patientUserId);

        await this.patientStatusSpecification.assertUserCanSetNormal(user, patientStatus);

        if (patientStatus.status === PatientStatusEnum.Normal) {
            return;
        }

        patientStatus.status = PatientStatusEnum.Normal;
        patientStatus.setBy = user.id;
        patientStatus.setAt = currentUnixTimestamp();

        await this.patientStatusRepository.persist(patientStatus);
    }
}
