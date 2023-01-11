import {Inject, Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {ConfirmSignUpUserDto} from 'domain/dtos/request/auth/confirm-sign-up-user.dto';
import {IMailService} from 'app/modules/mail/services/abstract/mail.service';
import {IAuthService} from 'app/modules/auth/services/auth.service';

@Injectable()
export class AuthListener {
    public constructor(
        @Inject(IMailService) private mailService: IMailService,
        @Inject(IAuthService) private readonly authService: IAuthService,
    ) {}

    @OnEvent('user-activated')
    public async handleUserActivated(dto: ConfirmSignUpUserDto): Promise<void> {
        await this.mailService.sendNotificationThatUserWasActivated(dto.email);
    }
}
