import {Inject, Injectable} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserAvatarService} from 'app/modules/profile/services/user-avatar.service';
import {IFileNameService} from 'app/modules/profile/services/file-name.service';
import {
    ConfirmChangeEmailUseCase,
    ChangePasswordUseCase,
    DeleteMyProfileUseCase,
    UploadUserAvatarUseCase,
    RecoverMyProfileUseCase,
    ChangeEmailUseCase,
} from 'app/modules/profile/use-cases';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';
import {RemoveMyAvatarUseCase} from 'app/modules/profile/use-cases/remove-my-avatar.use-case';
import {IRemoveMyAvatarService} from 'app/modules/profile/services/remove-my-avatar.service';

@Injectable()
export class ProfileUseCasesFactory {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IUserAvatarService) private readonly userAvatarService: IUserAvatarService,
        @Inject(IFileNameService) private readonly fileNameService: IFileNameService,
        @Inject(ProfileSpecification) private readonly profileSpecification: ProfileSpecification,
        @Inject(IAuthService) private readonly authService: IAuthService,
        @Inject(UserDtoService) private readonly userDtoService: UserDtoService,
        @Inject(IRemoveMyAvatarService) private readonly removeMyAvatarService: IRemoveMyAvatarService,
    ) {}

    public createUploadUserAvatarUseCase(): UploadUserAvatarUseCase {
        return new UploadUserAvatarUseCase(
            this.userRepository,
            this.authedUserService,
            this.userAvatarService,
            this.fileNameService,
        );
    }

    public createRemoveMyAvatarUseCase(): RemoveMyAvatarUseCase {
        return new RemoveMyAvatarUseCase(this.authedUserService, this.removeMyAvatarService);
    }

    public createDeleteMyProfile(): DeleteMyProfileUseCase {
        return new DeleteMyProfileUseCase(
            this.userRepository,
            this.authedUserService,
            this.profileSpecification,
            this.userDtoService,
        );
    }

    public createRecoverMyProfile(): RecoverMyProfileUseCase {
        return new RecoverMyProfileUseCase(this.userRepository, this.authedUserService, this.profileSpecification);
    }

    public createChangeEmailUseCase(): ChangeEmailUseCase {
        return new ChangeEmailUseCase(this.authService);
    }

    public createConfirmChangeEmailUseCase(): ConfirmChangeEmailUseCase {
        return new ConfirmChangeEmailUseCase(this.authService, this.authedUserService, this.userRepository);
    }

    public createChangePasswordUseCase(): ChangePasswordUseCase {
        return new ChangePasswordUseCase(
            this.authedUserService,
            this.authService,
            this.profileSpecification,
            this.userRepository,
        );
    }
}
