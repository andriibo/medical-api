import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientStatusEntityMapper} from 'app/modules/patient-status/mappers/patient-status-entity.mapper';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {currentUnixTimestamp} from 'support/date.helper';
import {PatientCategoryEnum, PatientStatusEnum} from 'domain/constants/patient.const';

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
        const patientCategories = await this.patientCategoryRepository.getNormalByPatientUserId(patient.id);
        patientCategories.map((item) => {
            item.patientCategory = PatientCategoryEnum.Abnormal;
            item.patientCategoryUpdatedAt = currentUnixTimestamp();
        });

        await this.patientCategoryRepository.update(patientCategories);
    }
}
