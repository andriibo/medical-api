import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ConfirmSignUpModel} from 'app/modules/auth/models';
import {ConfirmSignUpUserDto} from 'domain/dtos/request/auth/confirm-sign-up-user.dto';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';

export class ConfirmSignUpUserUseCase {
    public constructor(
        private readonly authService: IAuthService,
        private readonly authEventEmitter: IAuthEventEmitter,
    ) {}

    public async confirmSignUpUser(dto: ConfirmSignUpUserDto): Promise<void> {
        await this.authService.confirmSignUp(ConfirmSignUpModel.fromConfirmSignUpUserDto(dto));

        await this.authEventEmitter.emitUserActivated(dto);
    }
}
