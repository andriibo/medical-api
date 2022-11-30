import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {CaregiverDto} from 'domain/dtos/response/profile/caregiver.dto';

export class CaregiverProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly fileUrlService: IFileUrlService,
    ) {}

    public async getProfileInfo(): Promise<CaregiverDto> {
        const user = await this.authedUserService.getUser();
        user.avatar = this.fileUrlService.createUrlToUserAvatar(user.avatar);

        return CaregiverDto.fromUser(user);
    }
}
