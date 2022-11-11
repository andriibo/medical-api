import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IFileService} from 'app/modules/profile/services/abstract/file.service';

export class UploadAvatarPatientProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly fileService: IFileService,
    ) {}

    public async uploadAvatarProfile(imageBuffer: Buffer, name: string): Promise<void> {
        const user = await this.authedUserService.getUser();

        if (user.avatar) {
            await this.fileService.deletePublicFile(user.avatar);
        }

        const filename = await this.fileService.uploadPublicFile(imageBuffer, name);

        await this.userRepository.updateAvatar(user.id, filename);
    }
}
