import {Module} from '@nestjs/common';
import {AuthModule} from 'infrastructure/modules';
import {CronUseCasesFactory} from 'infrastructure/modules/cron/factories/cron-use-cases.factory';
import {CronService} from 'app/modules/cron/services/cron.service';

@Module({
    imports: [AuthModule],
    providers: [
        CronUseCasesFactory,
        {
            provide: CronService,
            useClass: CronService,
        },
    ],
})
export class CronModule {}
