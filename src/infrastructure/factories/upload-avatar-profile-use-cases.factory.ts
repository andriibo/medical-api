import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUploadAvatarService} from 'app/modules/profile/services/upload-avatar.service';
import {UploadAvatarProfileUseCase} from 'app/modules/profile/use-cases/upload-avatar-profile.use-case';

@Injectable()
export class UploadAvatarProfileUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IUploadAvatarService) private readonly uploadAvatarService: IUploadAvatarService,
    ) {}

    public uploadAvatarProfileUseCase(): UploadAvatarProfileUseCase {
        return new UploadAvatarProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.uploadAvatarService,
        );
    }
}
