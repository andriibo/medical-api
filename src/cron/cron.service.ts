import {Inject, Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthService} from 'app/modules/auth/services/auth.service';

@Injectable()
export class CronService {
    public constructor(
        @Inject(IUserRepository) private readonly userRepository: IUserRepository,
        @Inject(IAuthService) private readonly authService: IAuthService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    public async removeUsersMarkedDeletedAt(): Promise<void> {
        const users = await this.userRepository.getUsersMarkedDeletedAt();
        if (users.length) {
            const userIds = users.map((user) => user.id);
            userIds.forEach((id) => {
                this.authService.deleteUser(id);
            });
            console.log(userIds);
            this.userRepository.deleteByIds(userIds);
        }
    }
}
