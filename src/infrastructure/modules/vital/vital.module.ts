import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GrantedUserController, PatientController, VitalController} from 'controllers/vital';
import {PatientUseCasesFactory, GrantedUserUseCasesFactory, VitalUseCasesFactory} from './factories/';
import {VitalModel} from './models';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {PatientVitalThresholdsModule} from 'infrastructure/modules/patient-vital-thresholds/patient-vital-thresholds.module';
import {PatientVitalThresholdsIndependentModule} from 'infrastructure/modules/patient-vital-thresholds/patient-vital-thresholds.ind.module';
import {UserIndependentModule} from 'infrastructure/modules/auth/user.ind.module';
import {VitalIndependentModule} from './vital.ind.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([VitalModel]),
        AuthModule,
        UserIndependentModule,
        PatientDataAccessModule,
        PatientVitalThresholdsModule,
        PatientVitalThresholdsIndependentModule,
        VitalIndependentModule,
    ],
    controllers: [PatientController, GrantedUserController, VitalController],
    providers: [PatientUseCasesFactory, GrantedUserUseCasesFactory, VitalUseCasesFactory],
})
export class VitalModule {}
