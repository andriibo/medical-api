import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';
import {CaregiverDto} from 'domain/dtos/response/profile/caregiver.dto';
import {ICaregiverMetadataRepository} from 'app/modules/profile/repositories';

export class CaregiverProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly caregiverMetadataRepository: ICaregiverMetadataRepository,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getProfileInfo(): Promise<CaregiverDto> {
        const user = await this.authedUserService.getUser();
        const caregiverMetadata = await this.caregiverMetadataRepository.getOneById(user.id);

        return this.userDtoMapper.mapCaregiverDtoByUserAndMetadata(user, caregiverMetadata);
    }
}
