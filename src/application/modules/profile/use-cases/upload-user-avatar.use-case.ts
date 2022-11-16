import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserAvatarService} from 'app/modules/profile/services/user-avatar.service';

export class UploadUserAvatarUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly userAvatarService: IUserAvatarService,
    ) {}

    public async uploadAvatarProfile(dataBuffer: Buffer, mimetype: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        user.avatar = await this.userAvatarService.uploadFile(user, dataBuffer, mimetype);

        await this.userRepository.updateAvatar(user);
    }
}
