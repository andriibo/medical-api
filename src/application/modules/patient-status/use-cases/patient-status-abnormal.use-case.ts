import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {PatientStatusEnum} from 'domain/constants/patient.const';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';

export class PatientStatusAbnormalUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
        private readonly patientStatusMapper: IPatientStatusEntityMapper,
        private readonly patientStatusSpecification: PatientStatusSpecification,
    ) {}

    public async setStatusAbnormal(patientUserId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const patientStatus = await this.patientStatusRepository.getByPatientUserId(patientUserId);

        await this.patientStatusSpecification.assertUserCanSetAbnormal(user, patientStatus);

        if (patientStatus.status === PatientStatusEnum.Abnormal) {
            return;
        }

        patientStatus.status = PatientStatusEnum.Abnormal;

        await this.patientStatusRepository.persist(patientStatus);
    }
}
