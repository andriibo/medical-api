import {Module} from '@nestjs/common';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {CronService} from 'app/modules/cron/services/cron.service';
import {IUserRepository} from 'app/modules/auth/repositories';
import {AuthModule} from 'infrastructure/modules';

@Module({
    imports: [AuthModule],
    providers: [
        {
            provide: CronService,
            useFactory: (userRepository: IUserRepository, authService: IAuthService) => {
                return new CronService(userRepository, authService);
            },
            inject: [IUserRepository, IAuthService],
        },
    ],
})
export class CronModule {}
