import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {IUserRepository} from 'app/modules/auth/repositories';
import {ConfirmSignUpUserUseCase, SignInUseCase, SignUpUseCase} from 'app/modules/auth/use-cases';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';

@Injectable()
export class AuthUseCasesFactory {
    public constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IUserEntityMapper) private readonly userEntityMapper: IUserEntityMapper,
        @Inject(IAuthEventEmitter) private readonly authEventEmitter: IAuthEventEmitter,
    ) {}

    public createSignUpUseCase(): SignUpUseCase {
        return new SignUpUseCase(this.authService, this.userRepository, this.userEntityMapper, this.authEventEmitter);
    }

    public createSignInUseCase(): SignInUseCase {
        return new SignInUseCase(this.authService);
    }

    public createConfirmSignUpUseCase(): ConfirmSignUpUserUseCase {
        return new ConfirmSignUpUserUseCase(this.authService, this.authEventEmitter);
    }
}
