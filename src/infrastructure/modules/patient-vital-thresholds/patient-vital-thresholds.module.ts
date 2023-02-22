import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/patient-vital-thresholds';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientVitalThresholdsModel} from './models';
import {DoctorUseCasesFactory, PatientUseCasesFactory, GrantedUserUseCasesFactory} from './factories';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GrantedUserController} from 'controllers/patient-vital-thresholds/granted-user.controller';
import {PatientVitalThresholdsIndependentModule} from './patient-vital-thresholds.ind.module';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {VitalModule} from 'infrastructure/modules/vital/vital.module';
import {FileModule} from 'infrastructure/modules/file/file.module';
import {AuthIndependentModule} from 'infrastructure/modules/auth/auth.ind.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PatientVitalThresholdsModel]),
        AuthModule,
        AuthIndependentModule,
        PatientDataAccessModule,
        PatientVitalThresholdsIndependentModule,
        VitalModule,
        FileModule,
    ],
    exports: [PatientVitalThresholdsSpecification],
    controllers: [DoctorController, PatientController, GrantedUserController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        GrantedUserUseCasesFactory,
        {
            provide: PatientVitalThresholdsSpecification,
            useFactory: (patientDataAccessSpecification: PatientDataAccessSpecification) => {
                return new PatientVitalThresholdsSpecification(patientDataAccessSpecification);
            },
            inject: [PatientDataAccessSpecification],
        },
    ],
})
export class PatientVitalThresholdsModule {}
