import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

export class PatientProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly patientDataAccessSpecification: PatientDataAccessSpecification,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getProfileInfo(patientUserId: string): Promise<PatientDto> {
        const user = await this.authedUserService.getUser();
        const patient = await this.userRepository.getOneById(patientUserId);
        if (patient === null) {
            throw new EntityNotFoundError('Patient Not Found.');
        }

        await this.patientDataAccessSpecification.assertGrantedUserIdHasAccess(user.id, patient.id);

        const patientMetadata = await this.patientMetadataRepository.getOneById(patient.id);

        const dto = PatientDto.fromUserAndPatientMetadata(patient, patientMetadata);
        dto.avatar = this.fileUrlService.createUrlToUserAvatar(dto.avatar);

        return dto;
    }
}
