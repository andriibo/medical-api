import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {UploadUserAvatarUseCase} from 'app/modules/profile/use-cases/profile/upload-user-avatar.use-case';
import {IUserAvatarService} from 'app/modules/profile/services/user-avatar.service';
import {IFileNameService} from 'app/modules/profile/services/file-name.service';
import {DeleteMyProfileUseCase} from 'app/modules/profile/use-cases/profile';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';
import {RecoverMyProfileUseCase} from 'app/modules/profile/use-cases/profile/recover-my-profile.use-case';
import {ChangeEmailUseCase} from 'app/modules/profile/use-cases/profile/change-email.use-case';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ChangePasswordUseCase} from 'app/modules/profile/use-cases/profile/change-password.use-case';

@Injectable()
export class ProfileUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IUserAvatarService) private readonly userAvatarService: IUserAvatarService,
        @Inject(IFileNameService) private readonly fileNameService: IFileNameService,
        @Inject(ProfileSpecification) private readonly profileSpecification: ProfileSpecification,
        @Inject(IAuthService) private readonly authService: IAuthService,
    ) {}

    public createUploadUserAvatarUseCase(): UploadUserAvatarUseCase {
        return new UploadUserAvatarUseCase(
            this.userRepository,
            this.authedUserService,
            this.userAvatarService,
            this.fileNameService,
        );
    }

    public createDeleteMyProfile(): DeleteMyProfileUseCase {
        return new DeleteMyProfileUseCase(this.userRepository, this.authedUserService, this.profileSpecification);
    }

    public createRecoverMyProfile(): RecoverMyProfileUseCase {
        return new RecoverMyProfileUseCase(this.userRepository, this.authedUserService, this.profileSpecification);
    }

    public createChangeEmailUseCase(): ChangeEmailUseCase {
        return new ChangeEmailUseCase(this.authService, this.authedUserService);
    }

    public createChangePasswordUseCase(): ChangePasswordUseCase {
        return new ChangePasswordUseCase(this.authService);
    }
}
