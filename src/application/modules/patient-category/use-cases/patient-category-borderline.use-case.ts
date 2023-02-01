import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {EntityNotFoundError} from 'app/errors';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientCategory, PatientCategoryEnum} from 'domain/entities/patient-category.entity';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {PatientCategorySpecification} from 'app/modules/patient-category/specifications/patient-category.specification';

export class PatientCategoryBorderlineUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly patientCategoryRepository: IPatientCategoryRepository,
        private readonly patientCategorySpecification: PatientCategorySpecification,
    ) {}

    public async setBorderline(patientUserId: string): Promise<void> {
        const grantedUser = await this.authedUserService.getUser();
        await this.patientDataAccessSpecification.assertGrantedUserIdHasAccess(grantedUser.id, patientUserId);

        const patientCategory = await this.getCategory(patientUserId, grantedUser.id);
        this.patientCategorySpecification.assertGrantedUserCanSetBorderline(patientCategory);

        patientCategory.patientCategory = PatientCategoryEnum.Borderline;
        patientCategory.patientCategoryUpdatedAt = currentUnixTimestamp();
        await this.patientCategoryRepository.update(patientCategory);
    }

    private async getCategory(patientUserId: string, grantedUserId: string): Promise<PatientCategory> {
        const patientCategory = await this.patientCategoryRepository.getOneByPatientUserIdAndGrantedUserId(
            patientUserId,
            grantedUserId,
        );
        if (patientCategory === null) {
            throw new EntityNotFoundError('PatientCategory Not Found.');
        }

        return patientCategory;
    }
}
