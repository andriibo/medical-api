import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {UploadUserAvatarUseCase} from 'app/modules/profile/use-cases/upload-user-avatar.use-case';
import {S3Service} from 'infrastructure/aws/s3/s3.service';

@Injectable()
export class UserAvatarUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(S3Service) private readonly s3Service: S3Service,
    ) {}

    public uploadUserAvatarUseCase(): UploadUserAvatarUseCase {
        return new UploadUserAvatarUseCase(this.userRepository, this.authedUserService, this.s3Service);
    }
}
