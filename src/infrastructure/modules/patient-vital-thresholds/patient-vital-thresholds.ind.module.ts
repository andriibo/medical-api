import {Module} from '@nestjs/common';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {PatientVitalThresholdsModelMapper} from './mappers/patient-vital-thresholds-model.mapper';

@Module({
    exports: [IPatientVitalThresholdsEntityMapper],
    providers: [
        {
            provide: IPatientVitalThresholdsEntityMapper,
            useClass: PatientVitalThresholdsModelMapper,
        },
    ],
})
export class PatientVitalThresholdsIndependentModule {}
