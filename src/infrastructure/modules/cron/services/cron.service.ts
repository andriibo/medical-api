import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {ConfigService} from '@nestjs/config';
import {CronUseCasesFactory} from 'infrastructure/modules/cron/factories/cron-use-cases.factory';

@Injectable()
export class CronService {
    public constructor(
        private readonly cronUseCasesFactory: CronUseCasesFactory,
        private readonly configService: ConfigService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async removeUsersMarkedDeletedAt(): Promise<void> {
        if (!this.configService.get<boolean>('CRON_AVAILABLE')) {
            return;
        }
        const useCase = this.cronUseCasesFactory.createRemoveUsersUseCase();
        try {
            await useCase.removeMarkedForDeleting();
        } catch (error) {
            console.log(error.message);
        }
    }
}
