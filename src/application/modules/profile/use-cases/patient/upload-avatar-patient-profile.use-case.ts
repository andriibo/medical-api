import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUploadAvatarService} from 'app/modules/profile/services/upload-avatar.service';

export class UploadAvatarPatientProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly uploadAvatarService: IUploadAvatarService,
    ) {}

    public async uploadAvatarProfile(imageBuffer: Buffer, name: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const filename = await this.uploadAvatarService.uploadFile(user, imageBuffer, name);

        await this.userRepository.updateAvatar(user.id, filename);
    }
}
