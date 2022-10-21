import {IUserRepository, IPatientMetadataRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {UpdatePatientProfileDto} from 'domain/dtos/request/profile/update-patient-profile.dto';
import {IUserProfileMapper} from 'app/mappers/user-profile.mapper';

export class UpdatePatientProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly patientMetadataRepository: IPatientMetadataRepository,
        private readonly userProfileMapper: IUserProfileMapper,
    ) {}

    public async updateProfileInfo(dto: UpdatePatientProfileDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const metadata = await this.patientMetadataRepository.getOneById(user.id);

        const modifiedUser = this.userProfileMapper.mapByUpdatePatientProfileDto(dto, user, metadata);

        await this.userRepository.updateUserAndMetadata(modifiedUser);
    }
}
