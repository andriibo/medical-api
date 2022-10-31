import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/patient-vital-threshold';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientVitalThresholdModel} from 'infrastructure/models';
import {DoctorUseCasesFactory, PatientUseCasesFactory} from 'infrastructure/factories/patient-vital-threshold';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientVitalThresholdEntityMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {PatientVitalThresholdEntityMapper} from 'infrastructure/mappers/patient-vital-threshold-model.mapper';
import {PatientVitalThresholdsDtoMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-thresholds-dto.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([PatientVitalThresholdModel]), AuthModule, PatientDataAccessModule],
    controllers: [DoctorController, PatientController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
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
