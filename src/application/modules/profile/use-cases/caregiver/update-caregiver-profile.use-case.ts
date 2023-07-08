import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UpdateCaregiverProfileDto} from 'domain/dtos/request/profile/update-caregiver-profile.dto';
import {ICaregiverMetadataRepository} from 'app/modules/profile/repositories';

export class UpdateCaregiverProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly caregiverMetadataRepository: ICaregiverMetadataRepository,
        private readonly userProfileMapper: IUserProfileMapper,
    ) {}

    public async updateProfileInfo(dto: UpdateCaregiverProfileDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const metadata = await this.caregiverMetadataRepository.getOneById(user.id);

        const modifiedUser = this.userProfileMapper.mapByUpdateCaregiverProfileDto(dto, user, metadata);

        await this.userRepository.persist(modifiedUser);
    }
}
