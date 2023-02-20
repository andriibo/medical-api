import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ConfirmChangeEmailModel} from 'app/modules/auth/models';
import {ConfirmChangeEmailDto} from 'domain/dtos/request/auth/confirm-change-email.dto';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IUserRepository} from 'app/modules/auth/repositories';

export class ConfirmChangeEmailUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly authedUserService: IAuthedUserService,
        private readonly userRepository: IUserRepository,
    ) {}

    public async confirm(dto: ConfirmChangeEmailDto): Promise<void> {
        const confirmChangeEmailModel: ConfirmChangeEmailModel = {
            accessToken: dto.accessToken,
            code: dto.code,
        };

        await this.authService.confirmChangeEmail(confirmChangeEmailModel);
        const userAttributes = await this.authService.getUserAttributes(dto.accessToken);
        const user = await this.authedUserService.getUser();
        user.email = userAttributes.email;
        await this.userRepository.persist(user);
    }
}
