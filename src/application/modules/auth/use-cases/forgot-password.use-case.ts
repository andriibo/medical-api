import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ForgotPasswordDto} from 'domain/dtos/request/auth/forgot-password.dto';
import {ForgotPasswordMailSentDto} from 'domain/dtos/response/auth/forgot-password-mail-sent.dto';
import {ForgotPasswordSpecification} from 'app/modules/auth/specifications/forgot-password.specification';

export class ForgotPasswordUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly forgotPasswordSpecification: ForgotPasswordSpecification,
    ) {}

    public async initiateForgotPasswordProcess(dto: ForgotPasswordDto): Promise<ForgotPasswordMailSentDto> {
        await this.forgotPasswordSpecification.assertUserExistsByEmail(dto.email);

        const forgotPasswordRequestResult = await this.authService.forgotPassword(dto.email);

        return ForgotPasswordMailSentDto.fromResponse(forgotPasswordRequestResult);
    }
}
