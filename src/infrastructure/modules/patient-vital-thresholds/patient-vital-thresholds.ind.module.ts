import {Module} from '@nestjs/common';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {PatientVitalThresholdsModelMapper} from './mappers/patient-vital-thresholds-model.mapper';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsRepository} from 'infrastructure/modules/patient-vital-thresholds/models';

@Module({
    exports: [IPatientVitalThresholdsEntityMapper, IPatientVitalThresholdsRepository],
    providers: [
        {
            provide: IPatientVitalThresholdsEntityMapper,
            useClass: PatientVitalThresholdsModelMapper,
        },
        {
            provide: IPatientVitalThresholdsRepository,
            useClass: PatientVitalThresholdsRepository,
        },
    ],
})
export class PatientVitalThresholdsIndependentModule {}
