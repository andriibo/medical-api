import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {UploadUserAvatarUseCase} from 'app/modules/profile/use-cases/profile/upload-user-avatar.use-case';
import {IUserAvatarService} from 'app/modules/profile/services/user-avatar.service';
import {IFileNameService} from 'app/modules/profile/services/file-name.service';
import {DeleteProfileUseCase} from 'app/modules/profile/use-cases/profile';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';
import {RecoverMyProfileUseCase} from 'app/modules/profile/use-cases/profile/recover-my-profile.use-case';

@Injectable()
export class ProfileUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IUserAvatarService) private readonly userAvatarService: IUserAvatarService,
        @Inject(IFileNameService) private readonly fileNameService: IFileNameService,
        @Inject(ProfileSpecification) private readonly profileSpecification: ProfileSpecification,
    ) {}

    public createUploadUserAvatarUseCase(): UploadUserAvatarUseCase {
        return new UploadUserAvatarUseCase(
            this.userRepository,
            this.authedUserService,
            this.userAvatarService,
            this.fileNameService,
        );
    }

    public createDeleteProfile(): DeleteProfileUseCase {
        return new DeleteProfileUseCase(this.userRepository, this.authedUserService, this.profileSpecification);
    }

    public createRecoverMyProfile(): RecoverMyProfileUseCase {
        return new RecoverMyProfileUseCase(this.userRepository, this.authedUserService, this.profileSpecification);
    }
}
