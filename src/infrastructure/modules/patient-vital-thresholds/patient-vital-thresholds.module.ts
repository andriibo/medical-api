import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/patient-vital-threshold';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientVitalThresholdsModel, PatientVitalThresholdsRepository} from './models';
import {DoctorUseCasesFactory, PatientUseCasesFactory, GrantedUserUseCasesFactory} from './factories';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientVitalThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-vital-thresholds.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {PatientVitalThresholdsEntityMapper} from './mappers/patient-vital-thresholds-model.mapper';
import {GrantedUserController} from 'controllers/patient-vital-threshold/granted-user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PatientVitalThresholdsModel]), AuthModule, PatientDataAccessModule],
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
            provide: IPatientVitalThresholdsEntityMapper,
            useClass: PatientVitalThresholdsEntityMapper,
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
