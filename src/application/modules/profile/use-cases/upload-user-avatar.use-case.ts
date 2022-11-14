import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUploadUserAvatarService} from 'app/modules/profile/services/upload-user-avatar.service';

export class UploadUserAvatarUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly uploadUserAvatarService: IUploadUserAvatarService,
    ) {}

    public async uploadAvatarProfile(imageBuffer: Buffer): Promise<void> {
        const user = await this.authedUserService.getUser();
        const filename = await this.uploadUserAvatarService.uploadFile(user, imageBuffer);
        user.avatar = filename;

        await this.userRepository.updateAvatar(user);
    }
}
