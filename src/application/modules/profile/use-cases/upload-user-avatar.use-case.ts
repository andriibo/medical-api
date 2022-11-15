import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {Express} from 'express';
import {S3Service} from 'infrastructure/aws/s3/s3.service';

export class UploadUserAvatarUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly s3Service: S3Service,
    ) {}

    public async uploadAvatarProfile(file: Express.Multer.File): Promise<void> {
        const user = await this.authedUserService.getUser();
        user.avatar = await this.s3Service.uploadFile(user, file);

        await this.userRepository.updateAvatar(user);
    }
}
