import {Module} from '@nestjs/common';
import {IUserRepository} from 'app/modules/auth/repositories';
import {UserRepository, DoctorMetadataRepository, PatientMetadataRepository} from './models';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {UserModelMapper} from './mappers/user-model.mapper';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {FileModule} from 'infrastructure/modules/file/file.module';
import {ThresholdsDtoService} from 'app/modules/patient-vital-thresholds/services/thresholds-dto.service';

@Module({
    imports: [FileModule],
    exports: [
        IUserRepository,
        IPatientMetadataRepository,
        IDoctorMetadataRepository,
        IUserEntityMapper,
        UserDtoService,
        ThresholdsDtoService,
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
            provide: IUserEntityMapper,
            useClass: UserModelMapper,
        },
        {
            provide: UserDtoService,
            useFactory: (fileUrlService: IFileUrlService) => {
                return new UserDtoService(fileUrlService);
            },
            inject: [IFileUrlService],
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
export class UserModule {}
