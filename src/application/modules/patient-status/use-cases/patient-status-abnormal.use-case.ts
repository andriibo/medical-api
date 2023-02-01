import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {PatientStatusEnum} from 'domain/entities/patient-status.entity';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {PatientCategoryEnum} from 'domain/entities/patient-category.entity';

export class PatientStatusAbnormalUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientStatusRepository: IPatientStatusRepository,
        private readonly patientStatusMapper: IPatientStatusEntityMapper,
        private readonly patientCategoryRepository: IPatientCategoryRepository,
    ) {}

    public async setStatusAbnormal(): Promise<void> {
        const patient = await this.authedUserService.getUser();
        const patientStatusModel = this.patientStatusMapper.mapByPatientAndStatus(patient, PatientStatusEnum.Abnormal);

        await this.patientStatusRepository.persist(patientStatusModel);
        await this.patientCategoryRepository.updateNormalByPatientUserId(
            patient.id,
            PatientCategoryEnum.Abnormal,
            currentUnixTimestamp(),
        );
    }
}
