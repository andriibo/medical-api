import {Module} from '@nestjs/common';
import {AuthModule, ProfileModule} from 'infrastructure/modules';
import {CronService} from 'infrastructure/modules/cron/services/cron.service';
import {CronUseCasesFactory} from 'infrastructure/modules/cron/factories/cron-use-cases.factory';

@Module({
    imports: [ProfileModule, AuthModule],
    providers: [
        CronUseCasesFactory,
        {
            provide: CronService,
            useClass: CronService,
        },
    ],
})
export class CronModule {}
