import {Module} from '@nestjs/common';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {PatientVitalThresholdsEntityMapper} from './mappers/patient-vital-thresholds-model.mapper';

@Module({
    exports: [IPatientVitalThresholdsEntityMapper],
    providers: [
        {
            provide: IPatientVitalThresholdsEntityMapper,
            useClass: PatientVitalThresholdsEntityMapper,
        },
    ],
})
export class PatientVitalThresholdsIndependentModule {}
