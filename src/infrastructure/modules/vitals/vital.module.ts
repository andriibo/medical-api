import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {GrantedUserController, PatientController} from 'controllers/vital';
import {VitalUseCasesFactory} from './factories/vital-use-cases.factory';
import {VitalModel, VitalRepository} from './models';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';

@Module({
    imports: [TypeOrmModule.forFeature([VitalModel]), AuthModule, PatientDataAccessModule],
    controllers: [PatientController, GrantedUserController],
    exports: [IVitalRepository],
    providers: [
        VitalUseCasesFactory,
        {
            provide: IVitalRepository,
            useClass: VitalRepository,
        },
    ],
})
export class VitalModule {}
