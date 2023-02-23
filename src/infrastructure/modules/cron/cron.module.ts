import {Module} from '@nestjs/common';
import {ProfileModule} from 'infrastructure/modules';
import {RemoveUsersJob} from 'infrastructure/modules/cron/jobs/remove-users.job';
import {CronUseCasesFactory} from 'infrastructure/modules/cron/factories/cron-use-cases.factory';
import {UserIndependentModule} from 'infrastructure/modules/auth/user.ind.module';

@Module({
    imports: [ProfileModule, UserIndependentModule],
    providers: [
        CronUseCasesFactory,
        {
            provide: RemoveUsersJob,
            useClass: RemoveUsersJob,
        },
    ],
})
export class CronModule {}
