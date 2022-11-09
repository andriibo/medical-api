import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ConfirmForgotPasswordDto} from 'domain/dtos/request/auth/confirm-forgot-password.dto';
import {ForgotPasswordDto} from 'domain/dtos/request/auth/forgot-password.dto';
import {ForgotPasswordMailSentDto} from 'domain/dtos/response/auth/forgot-password-mail-sent.dto';
import {ConfirmForgotPasswordModel} from 'app/modules/auth/models';

export class ForgotPasswordUseCase {
    public constructor(private readonly authService: IAuthService) {}

    public async initiateForgotPasswordProcess(dto: ForgotPasswordDto): Promise<ForgotPasswordMailSentDto> {
        const forgotPasswordRequestResult = await this.authService.forgotPassword(dto.email);

        return ForgotPasswordMailSentDto.fromResponse(forgotPasswordRequestResult);
    }

    public async confirmForgotPassword(dto: ConfirmForgotPasswordDto): Promise<void> {
        const confirmForgotPasswordModel: ConfirmForgotPasswordModel = {
            email: dto.email,
            code: dto.code,
            password: dto.newPassword,
        };

        await this.authService.confirmForgotPassword(confirmForgotPasswordModel);
    }
}
