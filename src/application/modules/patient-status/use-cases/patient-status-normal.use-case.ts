import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {PatientStatusEnum} from 'domain/entities/patient-status.entity';

export class PatientStatusNormalUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
        private readonly patientStatusMapper: IPatientStatusEntityMapper,
    ) {}

    public async setStatusNormal(): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const patientStatusModel = this.patientStatusMapper.mapByPatientAndStatus(patient, PatientStatusEnum.Normal);
        await this.patientStatusRepository.persist(patientStatusModel);
    }
}
