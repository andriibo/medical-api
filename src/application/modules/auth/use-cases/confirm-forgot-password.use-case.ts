import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ConfirmForgotPasswordDto} from 'domain/dtos/request/auth/confirm-forgot-password.dto';
import {ConfirmForgotPasswordModel} from 'app/modules/auth/models';

export class ConfirmForgotPasswordUseCase {
    public constructor(private readonly authService: IAuthService) {}

    public async confirm(dto: ConfirmForgotPasswordDto): Promise<void> {
        const confirmForgotPasswordModel: ConfirmForgotPasswordModel = {
            email: dto.email,
            code: dto.code,
            password: dto.newPassword,
        };

        await this.authService.confirmForgotPassword(confirmForgotPasswordModel);
    }
}
