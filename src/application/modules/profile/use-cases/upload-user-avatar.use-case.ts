import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserAvatarService} from 'app/modules/profile/services/user-avatar.service';
import {IFileNameService} from 'app/modules/profile/services/file-name.service';

export class UploadUserAvatarUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly userAvatarService: IUserAvatarService,
        private readonly fileNameService: IFileNameService,
    ) {}

    public async uploadAvatarProfile(dataBuffer: Buffer, mimetype: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        if (user.avatar) {
            await this.userAvatarService.deleteFile(user.avatar);
        }
        const filename = this.fileNameService.createNameToUserAvatar(mimetype);
        user.avatar = await this.userAvatarService.uploadFile(dataBuffer, filename);

        await this.userRepository.updateAvatar(user);
    }
}
