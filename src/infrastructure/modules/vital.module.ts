import {Module} from '@nestjs/common';
import {IUserRepository, IVitalRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {VitalController} from 'controllers/vital.controller';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {UserRepository, VitalRepository} from 'infrastructure/repositories';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';

@Module({
    controllers: [VitalController],
    providers: [
        VitalUseCasesFactory,
        {
            provide: IVitalRepository,
            useClass: VitalRepository,
        },
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IAuthedUserService,
            useClass: AuthedUserService,
        },
    ],
})
export class VitalModule {}
