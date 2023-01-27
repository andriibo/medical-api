import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {EntityNotFoundError} from 'app/errors';
import {PatientCategoryDto} from 'domain/dtos/response/patient-category/patient-category.dto';
import {IUserRepository} from 'app/modules/auth/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

export class PatientCategoryUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userRepository: IUserRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly patientCategoryRepository: IPatientCategoryRepository,
    ) {}

    public async getPatientCategory(patientUserId: string): Promise<PatientCategoryDto> {
        const user = await this.authedUserService.getUser();
        const patient = await this.userRepository.getOneById(patientUserId);

        if (patient === null) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(user, patient.id);

        return await this.getCategory(patientUserId);
    }

    private async getCategory(patientUserId: string): Promise<PatientCategoryDto> {
        const patientCategory = await this.patientCategoryRepository.getByPatientUserId(patientUserId);
        if (patientCategory === null) {
            throw new EntityNotFoundError('PatientCategory Not Found.');
        }

        return PatientCategoryDto.fromPatientCategory(patientCategory);
    }
}
