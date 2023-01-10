import {Injectable} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {CronUseCasesFactory} from 'infrastructure/modules/cron/factories/cron-use-cases.factory';

@Injectable()
export class CronService {
    public constructor(private readonly cronUseCasesFactory: CronUseCasesFactory) {}

    @Cron(CronExpression.EVERY_MINUTE)
    public async removeUsersMarkedDeletedAt(): Promise<void> {
        const useCase = this.cronUseCasesFactory.removeUsers();

        try {
            return await useCase.remove();
        } catch (error) {
            console.log(error.message);
        }
    }
}
