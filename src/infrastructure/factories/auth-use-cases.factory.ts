import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/services/auth.service';
import {IUserEntityMapper} from 'app/mappers/user-entity.mapper';
import {IUserRepository} from 'app/repositories/user.repository';
import {ConfirmSignUpUserUseCase, SignInUseCase, SignUpUseCase} from 'app/use-cases/auth';

@Injectable()
export class AuthUseCasesFactory {
    constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IUserEntityMapper) private readonly userEntityMapper: IUserEntityMapper,
    ) {}

    public createSignUpUseCase(): SignUpUseCase {
        return new SignUpUseCase(this.authService, this.userRepository, this.userEntityMapper);
    }

    public createSignInUseCase(): SignInUseCase {
        return new SignInUseCase(this.authService);
    }

    public createConfirmSignUpUseCase(): ConfirmSignUpUserUseCase {
        return new ConfirmSignUpUserUseCase(this.authService);
    }
}
