import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {EntityNotFoundError} from 'app/errors';
import {PatientCategoryDto} from 'domain/dtos/response/patient-category/patient-category.dto';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class PatientCategoryUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly patientCategoryRepository: IPatientCategoryRepository,
    ) {}

    public async getPatientCategory(patientUserId: string): Promise<PatientCategoryDto> {
        const grantedUser = await this.authedUserService.getUser();
        await this.patientDataAccessSpecification.assertAccessIsOpenByGrantedUserIdAndPatientUserId(
            grantedUser.id,
            patientUserId,
        );

        return await this.getCategory(patientUserId, grantedUser.id);
    }

    private async getCategory(patientUserId: string, grantedUserId: string): Promise<PatientCategoryDto> {
        const patientCategory = await this.patientCategoryRepository.getOneByPatientUserIdAndGrantedUserId(
            patientUserId,
            grantedUserId,
        );
        if (patientCategory === null) {
            throw new EntityNotFoundError('PatientCategory Not Found.');
        }

        return PatientCategoryDto.fromPatientCategory(patientCategory);
    }
}
