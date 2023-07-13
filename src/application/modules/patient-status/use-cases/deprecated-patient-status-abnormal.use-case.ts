import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {PatientStatusEnum} from 'domain/constants/patient.const';

export class DeprecatedPatientStatusAbnormalUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
        private readonly patientStatusMapper: IPatientStatusEntityMapper,
    ) {}

    public async setStatusAbnormal(): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const patientStatusModel = this.patientStatusMapper.mapByPatientAndStatus(patient, PatientStatusEnum.Abnormal);

        await this.patientStatusRepository.persist(patientStatusModel);
    }
}
