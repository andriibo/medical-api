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
import {VitalsDtoService} from 'app/modules/vital/services/vitals-dto.service';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

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
    providers: [
        PatientUseCasesFactory,
        GrantedUserUseCasesFactory,
        VitalUseCasesFactory,
        {
            provide: VitalsDtoService,
            useFactory: (
                patientVitalThresholdsRepository: IPatientVitalThresholdsRepository,
                thresholdsDtoService: ThresholdsDtoService,
            ) => {
                return new VitalsDtoService(patientVitalThresholdsRepository, thresholdsDtoService);
            },
            inject: [IPatientVitalThresholdsRepository, ThresholdsDtoService],
        },
    ],
})
export class VitalModule {}
