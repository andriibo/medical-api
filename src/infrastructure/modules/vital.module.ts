import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {IVitalRepository} from 'app/repositories';
import {DoctorController, PatientController} from 'controllers/vital';
import {VitalUseCasesFactory} from 'infrastructure/factories/vital-use-cases.factory';
import {VitalModel} from 'infrastructure/models';
import {VitalRepository} from 'infrastructure/repositories';
import {AuthModule} from './auth.module';
import {PatientDataAccessModule} from './patient-data-access.module';

@Module({
    imports: [TypeOrmModule.forFeature([VitalModel]), AuthModule, PatientDataAccessModule],
    controllers: [PatientController, DoctorController],
    providers: [
        VitalUseCasesFactory,
        {
            provide: IVitalRepository,
            useClass: VitalRepository,
        },
    ],
})
export class VitalModule {}
