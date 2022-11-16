import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/profile';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientMetadataRepository, DoctorMetadataRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'infrastructure/models';
import {DoctorUseCasesFactory, PatientUseCasesFactory} from 'infrastructure/factories/profile';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UserProfileMapper} from 'infrastructure/mappers/user-profile.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {UserAvatarUseCasesFactory} from 'infrastructure/factories/user-avatar-use-cases.factory';
import {AvatarController} from 'controllers/profile/avatar.controller';
import {IFileUrlService} from 'app/modules/profile/services/file-url.service';
import {FileUrlService} from 'infrastructure/services/file-url.service';
import {S3Service} from 'infrastructure/aws/s3/s3.service';
import {IUserAvatarService} from 'app/modules/profile/services/s3.service';
import {IFileNameService} from 'app/modules/profile/services/file-name.service';
import {FileNameService} from 'infrastructure/services/file-name.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel]),
        AuthModule,
        PatientDataAccessModule,
    ],
    controllers: [PatientController, DoctorController, AvatarController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        UserAvatarUseCasesFactory,
        {
            provide: IPatientMetadataRepository,
            useClass: PatientMetadataRepository,
        },
        {
            provide: IDoctorMetadataRepository,
            useClass: DoctorMetadataRepository,
        },
        {
            provide: IUserProfileMapper,
            useClass: UserProfileMapper,
        },
        {
            provide: IUserAvatarService,
            useClass: S3Service,
        },
        {
            provide: IFileUrlService,
            useClass: FileUrlService,
        },
        {
            provide: IFileNameService,
            useClass: FileNameService,
        },
    ],
})
export class ProfileModule {}
