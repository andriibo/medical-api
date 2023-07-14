import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientStatusEnum} from 'domain/constants/patient.const';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';
import {currentUnixTimestamp} from 'support/date.helper';

export class PatientStatusBorderlineUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
        private readonly patientStatusSpecification: PatientStatusSpecification,
    ) {}

    public async setStatusBorderline(patientUserId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(patientUserId);

        await this.patientStatusSpecification.assertUserCanSetBorderline(user, patientStatus);

        if (patientStatus.status === PatientStatusEnum.Borderline) {
            return;
        }

        patientStatus.status = PatientStatusEnum.Borderline;
        patientStatus.setBy = user.id;
        patientStatus.setAt = currentUnixTimestamp();

        await this.patientStatusRepository.persist(patientStatus);
    }
}
