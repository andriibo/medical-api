import {IMailService} from 'app/modules/mail/services/mail.service';
import {Inject, Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {ConfirmSignUpUserDto} from 'domain/dtos/request/auth/confirm-sign-up-user.dto';

@Injectable()
export class AuthListener {
    public constructor(@Inject(IMailService) private mailService: IMailService) {}

    @OnEvent('user-activated')
    public async handleUserActivated(dto: ConfirmSignUpUserDto): Promise<void> {
        await this.mailService.sendNotificationThatUserWasActivated(dto.userName);
    }
}
