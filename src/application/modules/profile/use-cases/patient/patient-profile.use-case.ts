import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PatientDto} from 'domain/dtos/response/profile/patient.dto';
import {IAWSFileUrlService} from 'app/modules/profile/services/aws-file-url.service';

export class PatientProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly awsFileUrlService: IAWSFileUrlService,
    ) {}

    public async getProfileInfo(): Promise<PatientDto> {
        const user = await this.authedUserService.getUser();
        user.avatar = this.awsFileUrlService.generateFileUrl(user.avatar);
        const patientMetadata = await this.patientMetadataRepository.getOneById(user.id);

        return PatientDto.fromUserAndPatientMetadata(user, patientMetadata);
    }
}
