import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ChangeEmailModel, ConfirmChangeEmailModel} from 'app/modules/auth/models';
import {ConfirmChangeEmailDto} from 'domain/dtos/request/auth/confirm-change-email.dto';
import {ChangeEmailDto} from 'domain/dtos/request/auth/change-email.dto';
import {ChangeEmailResultDto} from 'domain/dtos/response/auth/change-email.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';

export class ChangeEmailUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly authedUserService: IAuthedUserService,
    ) {}

    public async changeEmail(dto: ChangeEmailDto): Promise<ChangeEmailResultDto> {
        const changeEmailModel: ChangeEmailModel = {
            accessToken: dto.accessToken,
            newEmail: dto.email,
        };

        const response = await this.authService.changeEmail(changeEmailModel);

        return ChangeEmailResultDto.fromResponse(response);
    }

    public async confirmChangeEmail(dto: ConfirmChangeEmailDto): Promise<void> {
        const confirmChangeEmailModel: ConfirmChangeEmailModel = {
            accessToken: dto.accessToken,
            code: dto.code,
        };

        await this.authService.confirmChangeEmail(confirmChangeEmailModel);

        await this.updateUserProfileData(dto.accessToken);
    }

    private async updateUserProfileData(accessToken: string): Promise<void> {
        const userAttributes = await this.authService.getUserAttributes(accessToken);
        await this.authedUserService.syncUserEmailWithExternalProvider(userAttributes.email);
    }
}
