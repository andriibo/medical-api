import {IDoctorMetadataRepository, IUserRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {UpdateDoctorProfileDto} from 'domain/dtos/request/profile/update-doctor-profile.dto';
import {IUserProfileMapper} from 'app/mappers/user-profile.mapper';

export class UpdateDoctorProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly doctorMetadataRepository: IDoctorMetadataRepository,
        private readonly userProfileMapper: IUserProfileMapper,
    ) {}

    public async updateProfileInfo(dto: UpdateDoctorProfileDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const metadata = await this.doctorMetadataRepository.getOneByUserId(user.userId);

        const modifiedUser = this.userProfileMapper.mapByUpdateDoctorProfileDto(dto, user, metadata);

        await this.userRepository.updateUserAndMetadata(modifiedUser);
    }
}
