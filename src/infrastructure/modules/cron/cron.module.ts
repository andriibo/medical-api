import {Module} from '@nestjs/common';
import {CronService} from 'app/modules/cron/services/cron.service';
import {IUserRepository} from 'app/modules/auth/repositories';
import {AuthModule} from 'infrastructure/modules';

@Module({
    imports: [AuthModule],
    providers: [
        {
            provide: CronService,
            useFactory: (userRepository: IUserRepository) => {
                return new CronService(userRepository);
            },
            inject: [IUserRepository],
        },
    ],
})
export class CronModule {}
