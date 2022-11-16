import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {Express} from 'express';
import {IUserAvatarService} from 'app/modules/profile/services/s3.service';

export class UploadUserAvatarUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly userAvatarService: IUserAvatarService,
    ) {}

    public async uploadAvatarProfile(file: Express.Multer.File): Promise<void> {
        const user = await this.authedUserService.getUser();
        user.avatar = await this.userAvatarService.uploadFile(user, file);

        await this.userRepository.updateAvatar(user);
    }
}
