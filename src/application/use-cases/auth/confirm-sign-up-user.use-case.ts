import {Inject, Injectable} from '@nestjs/common';
import {IAuthService} from 'app/abstractions/services/auth.service';
import {ConfirmSignUpModel} from 'app/abstractions/models';
import {ConfirmSignUpUserView} from 'presentation/views/auth';
import {IUserRepository} from 'app/abstractions/repositories/user.repository';

@Injectable()
export class ConfirmSignUpUserUseCase {
    constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @Inject(IUserRepository) private readonly usersRepository: IUserRepository,
    ) {}

    public async confirmSignUpUser(requestBody: ConfirmSignUpUserView): Promise<void> {
        await this.authService.confirmSignUp(new ConfirmSignUpModel(requestBody.userName, requestBody.code));
    }
}
