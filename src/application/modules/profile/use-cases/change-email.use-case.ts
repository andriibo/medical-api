import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ChangeEmailModel} from 'app/modules/auth/models';
import {ChangeEmailDto} from 'domain/dtos/request/auth/change-email.dto';
import {ChangeEmailResultDto} from 'domain/dtos/response/auth/change-email.dto';

export class ChangeEmailUseCase {
    public constructor(private readonly authService: IAuthService) {}

    public async changeEmail(dto: ChangeEmailDto): Promise<ChangeEmailResultDto> {
        const changeEmailModel: ChangeEmailModel = {
            accessToken: dto.accessToken,
            newEmail: dto.email,
        };

        return await this.authService.changeEmail(changeEmailModel);
    }
}
