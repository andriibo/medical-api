import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {CronUseCasesFactory} from 'infrastructure/modules/cron/factories/cron-use-cases.factory';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class CronService {
    public constructor(
        private readonly cronUseCasesFactory: CronUseCasesFactory,
        private readonly configService: ConfigService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    public async removeUsersMarkedDeletedAt(): Promise<void> {
        if (!this.configService.get<boolean>('CRON_AVAILABLE')) {
            return;
        }
        const useCase = this.cronUseCasesFactory.removeUsers();
        try {
            return await useCase.remove();
        } catch (error) {
            console.log(error.message);
        }
    }
}
