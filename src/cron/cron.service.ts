import {Inject, Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {IUserRepository} from 'app/modules/auth/repositories';

@Injectable()
export class CronService {
    public constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

    @Cron(CronExpression.EVERY_MINUTE)
    public async removeUsersMarkedDeletedAt(): Promise<void> {
        await this.userRepository.removeUsersMarkedDeletedAt();
    }
}
