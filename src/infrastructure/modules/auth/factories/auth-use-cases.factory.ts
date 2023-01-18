import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {
    ConfirmSignUpUserUseCase,
    ForgotPasswordUseCase,
    SignInUseCase,
    SignUpUseCase,
    ResendSignUpCodeUseCase,
} from 'app/modules/auth/use-cases';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';

@Injectable()
export class AuthUseCasesFactory {
    public constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IUserEntityMapper) private readonly userEntityMapper: IUserEntityMapper,
        @Inject(IAuthEventEmitter) private readonly authEventEmitter: IAuthEventEmitter,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
        @Inject(IFileUrlService) private readonly fileUrlService: IFileUrlService,
    ) {}

    public createSignUpUseCase(): SignUpUseCase {
        return new SignUpUseCase(this.authService, this.userRepository, this.userEntityMapper, this.authEventEmitter);
    }

    public createSignInUseCase(): SignInUseCase {
        return new SignInUseCase(this.authService, this.userRepository, this.fileUrlService);
    }

    public createConfirmSignUpUseCase(): ConfirmSignUpUserUseCase {
        return new ConfirmSignUpUserUseCase(this.authService, this.authEventEmitter);
    }

    public createResendSignUpCodeUseCase(): ResendSignUpCodeUseCase {
        return new ResendSignUpCodeUseCase(this.authService);
    }

    public createForgotPasswordUseCase(): ForgotPasswordUseCase {
        return new ForgotPasswordUseCase(this.authService);
    }
}
