import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {MyPatientDto} from 'domain/dtos/response/profile/my-patient.dto';
import {User} from 'domain/entities';

export class PatientProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly fileUrlService: IFileUrlService,
        private readonly patientCategoryRepository: IPatientCategoryRepository,
    ) {}

    public async getProfileInfo(patientUserId: string): Promise<MyPatientDto> {
        const grantedUser = await this.authedUserService.getUser();
        const patient = await this.userRepository.getOneById(patientUserId);
        if (patient === null) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        await this.patientDataAccessSpecification.assertGrantedUserHasAccess(grantedUser, patient.id);

        return await this.getMyPatientDto(patient, grantedUser.id);
    }

    private async getMyPatientDto(patient: User, grantedUserId: string): Promise<MyPatientDto> {
        const patientCategory = await this.patientCategoryRepository.getOneByPatientUserIdAndGrantedUserId(
            patient.id,
            grantedUserId,
        );
        const patientMetadata = await this.patientMetadataRepository.getOneById(patient.id);
        const dto = MyPatientDto.fromUserAndPatientMetadata(patient, patientMetadata);
        dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);
        dto.category = patientCategory.patientCategory;

        return dto;
    }
}
