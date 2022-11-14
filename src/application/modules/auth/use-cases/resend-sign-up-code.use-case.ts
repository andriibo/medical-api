import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ResendSignUpCodeDto} from 'domain/dtos/request/auth';
import {ConfirmEmailResentDto} from 'domain/dtos/response/auth';

export class ResendSignUpCodeUseCase {
    public constructor(private readonly authService: IAuthService) {}

    public async resendCode(dto: ResendSignUpCodeDto): Promise<ConfirmEmailResentDto> {
        const response = await this.authService.resendConfirmSignUpCode(dto.email);

        return ConfirmEmailResentDto.fromResponse(response);
    }
}
