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
        const avatarToDelete = user.avatar;

        user.avatar = this.fileNameService.createNameToUserAvatar(mimetype);

        await this.userAvatarService.uploadFile(dataBuffer, user.avatar);
        await this.userRepository.updateAvatar(user);

        if (avatarToDelete !== null) {
            await this.userAvatarService.deleteFile(avatarToDelete);
        }
    }
}
