import {IUserRepository} from 'app/modules/auth/repositories';
import {IDoctorMetadataRepository} from 'app/modules/profile/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {DoctorDto} from 'domain/dtos/response/profile/doctor.dto';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

export class DoctorProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly doctorMetadataRepository: IDoctorMetadataRepository,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getProfileInfo(): Promise<DoctorDto> {
        const user = await this.authedUserService.getUser();
        user.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);
        const doctorMetadata = await this.doctorMetadataRepository.getOneById(user.id);

        return DoctorDto.fromUserAndDoctorMetadata(user, doctorMetadata);
    }
}
