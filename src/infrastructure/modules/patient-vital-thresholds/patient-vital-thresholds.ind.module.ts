import {Module} from '@nestjs/common';
import {IPatientVitalThresholdsEntityMapper} from 'app/modules/patient-vital-thresholds/mappers/patient-vital-thresholds-entity.mapper';
import {PatientVitalThresholdsModelMapper} from './mappers/patient-vital-thresholds-model.mapper';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientVitalThresholdsRepository} from 'infrastructure/modules/patient-vital-thresholds/models';
import {PatientOwnsThresholdsSpecification} from 'app/modules/patient-vital-thresholds/specifications/patient-owns-thresholds.specification';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';
import {ProfileIndependentModule} from 'infrastructure/modules/profile/profile.ind.module';
import {AuthIndependentModule} from 'infrastructure/modules/auth/auth.ind.module';

@Module({
    imports: [ProfileIndependentModule, AuthIndependentModule],
    exports: [
        IPatientVitalThresholdsEntityMapper,
        IPatientVitalThresholdsRepository,
        PatientOwnsThresholdsSpecification,
        ThresholdsDtoService,
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
        {
            provide: ThresholdsDtoService,
            useFactory: (userRepository: IUserRepository, userDtoService: UserDtoService) => {
                return new ThresholdsDtoService(userRepository, userDtoService);
            },
            inject: [IUserRepository, UserDtoService],
        },
    ],
})
export class PatientVitalThresholdsIndependentModule {}
