import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/patient-vital-threshold';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientVitalThresholdModel, PatientVitalThresholdRepository} from './models';
import {DoctorUseCasesFactory, PatientUseCasesFactory, GrantedUserUseCasesFactory} from './factories';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientVitalThresholdEntityMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {PatientVitalThresholdEntityMapper} from './mappers/patient-vital-threshold-model.mapper';
import {PatientVitalThresholdsDtoMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-thresholds-dto.mapper';
import {GrantedUserController} from 'controllers/patient-vital-threshold/granted-user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PatientVitalThresholdModel]), AuthModule, PatientDataAccessModule],
    controllers: [DoctorController, PatientController, GrantedUserController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        GrantedUserUseCasesFactory,
        PatientVitalThresholdsDtoMapper,
        {
            provide: IPatientVitalThresholdRepository,
            useClass: PatientVitalThresholdRepository,
        },
        {
            provide: IPatientVitalThresholdEntityMapper,
            useClass: PatientVitalThresholdEntityMapper,
        },
        {
            provide: PatientVitalThresholdSpecification,
            useFactory: (patientDataAccessSpecification: PatientDataAccessSpecification) => {
                return new PatientVitalThresholdSpecification(patientDataAccessSpecification);
            },
            inject: [PatientDataAccessSpecification],
        },
    ],
})
export class PatientVitalThresholdModule {}