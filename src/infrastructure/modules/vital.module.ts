import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IPatientDataAccessRepository, IUserRepository, IVitalRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {DoctorController, PatientController} from 'controllers/vital';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {VitalModel} from 'infrastructure/models';
import {PatientDataAccessRepository, UserRepository, VitalRepository} from 'infrastructure/repositories';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';

@Module({
    imports: [TypeOrmModule.forFeature([VitalModel])],
    controllers: [PatientController, DoctorController],
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
        {
            provide: IPatientDataAccessRepository,
            useClass: PatientDataAccessRepository,
        },
    ],
})
export class VitalModule {}
