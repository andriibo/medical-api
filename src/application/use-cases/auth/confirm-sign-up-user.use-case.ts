import {IAuthService} from 'app/services/auth.service';
import {ConfirmSignUpModel} from 'app/models';
import {ConfirmSignUpUserDto} from 'domain/dtos/auth/confirm-sign-up-user.dto';

export class ConfirmSignUpUserUseCase {
    constructor(private readonly authService: IAuthService) {}

    public async confirmSignUpUser(dto: ConfirmSignUpUserDto): Promise<void> {
        await this.authService.confirmSignUp(ConfirmSignUpModel.fromConfirmSignUpUserDto(dto));
    }
}
