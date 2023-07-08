import {Module} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {
    UserRepository,
    DoctorMetadataRepository,
    PatientMetadataRepository,
    CaregiverMetadataRepository,
} from './models';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {UserModelMapper} from './mappers/user-model.mapper';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';

@Module({
    exports: [
        IUserRepository,
        IPatientMetadataRepository,
        IDoctorMetadataRepository,
        ICaregiverMetadataRepository,
        IUserEntityMapper,
    ],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IPatientMetadataRepository,
            useClass: PatientMetadataRepository,
        },
        {
            provide: IDoctorMetadataRepository,
            useClass: DoctorMetadataRepository,
        },
        {
            provide: ICaregiverMetadataRepository,
            useClass: CaregiverMetadataRepository,
        },
        {
            provide: IUserEntityMapper,
            useClass: UserModelMapper,
        },
    ],
})
export class UserIndependentModule {}
