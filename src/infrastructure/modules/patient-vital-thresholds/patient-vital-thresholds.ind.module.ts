import {Module} from '@nestjs/common';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {PatientVitalThresholdsModelMapper} from './mappers/patient-vital-thresholds-model.mapper';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsRepository} from 'infrastructure/modules/patient-vital-thresholds/models';
import {PatientOwnsThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-owns-thresholds.specification';

@Module({
    exports: [
        IPatientVitalThresholdsEntityMapper,
        IPatientVitalThresholdsRepository,
        PatientOwnsThresholdsSpecification,
    ],
    providers: [
        {
            provide: IPatientVitalThresholdsEntityMapper,
            useClass: PatientVitalThresholdsModelMapper,
        },
        {
            provide: IPatientVitalThresholdsRepository,
            useClass: PatientVitalThresholdsRepository,
        },
        {
            provide: PatientOwnsThresholdsSpecification,
            useFactory: (patientVitalThresholdsRepository: IPatientVitalThresholdsRepository) => {
                return new PatientOwnsThresholdsSpecification(patientVitalThresholdsRepository);
            },
            inject: [IPatientVitalThresholdsRepository],
        },
    ],
})
export class PatientVitalThresholdsIndependentModule {}
