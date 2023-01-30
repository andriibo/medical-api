import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/patient-vital-threshold';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientVitalThresholdsModel, PatientVitalThresholdsRepository} from './models';
import {DoctorUseCasesFactory, PatientUseCasesFactory, GrantedUserUseCasesFactory} from './factories';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {GrantedUserController} from 'controllers/patient-vital-threshold/granted-user.controller';
import {PatientVitalThresholdsIndependentModule} from './patient-vital-thresholds.ind.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PatientVitalThresholdsModel]),
        AuthModule,
        PatientDataAccessModule,
        PatientVitalThresholdsIndependentModule,
    ],
    controllers: [DoctorController, PatientController, GrantedUserController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        GrantedUserUseCasesFactory,
        {
            provide: IPatientVitalThresholdsRepository,
            useClass: PatientVitalThresholdsRepository,
        },
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
