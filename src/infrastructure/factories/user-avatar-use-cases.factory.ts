import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUploadUserAvatarService} from 'app/modules/profile/services/upload-user-avatar.service';
import {UploadUserAvatarUseCase} from 'app/modules/profile/use-cases/upload-user-avatar.use-case';

@Injectable()
export class UserAvatarUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IUploadUserAvatarService) private readonly uploadUserAvatarService: IUploadUserAvatarService,
    ) {}

    public uploadUserAvatarUseCase(): UploadUserAvatarUseCase {
        return new UploadUserAvatarUseCase(
            this.userRepository,
            this.authedUserService,
            this.uploadUserAvatarService,
        );
    }
}
