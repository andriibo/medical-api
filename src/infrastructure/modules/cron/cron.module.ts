import {Module} from '@nestjs/common';
import {AuthModule, ProfileModule} from 'infrastructure/modules';
import {RemoveUsersJob} from 'infrastructure/modules/cron/jobs/remove-users.job';
import {CronUseCasesFactory} from 'infrastructure/modules/cron/factories/cron-use-cases.factory';

@Module({
    imports: [ProfileModule, AuthModule],
    providers: [
        CronUseCasesFactory,
        {
            provide: RemoveUsersJob,
            useClass: RemoveUsersJob,
        },
    ],
})
export class CronModule {}
