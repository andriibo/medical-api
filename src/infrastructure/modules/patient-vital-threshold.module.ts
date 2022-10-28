import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/patient-vital-threshold';
import {IPatientVitalThresholdRepository} from 'app/modules/patient-vital-threshold/repositories';
import {PatientVitalThresholdRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientVitalThresholdModel} from 'infrastructure/models';
import {DoctorUseCasesFactory} from 'infrastructure/factories/patient-vital-threshold';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {PatientVitalThresholdSpecification} from 'app/modules/patient-vital-threshold/specifications/patient-vital-threshold.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {IPatientVitalThresholdMapper} from 'app/modules/patient-vital-threshold/mappers/patient-vital-threshold-entity.mapper';
import {PatientVitalThresholdMapper} from 'infrastructure/mappers/patient-vital-threshold-model.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([PatientVitalThresholdModel]), AuthModule, PatientDataAccessModule],
    controllers: [DoctorController, PatientController],
    providers: [
        DoctorUseCasesFactory,
        {
            provide: IPatientVitalThresholdRepository,
            useClass: PatientVitalThresholdRepository,
        },
        {
            provide: IPatientVitalThresholdMapper,
            useClass: PatientVitalThresholdMapper,
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
