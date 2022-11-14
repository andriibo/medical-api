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
import {ConfigService} from '@nestjs/config';
import {IUploadAvatarService} from 'app/modules/profile/services/upload-avatar.service';
import {UploadAvatarService} from 'infrastructure/services/upload-avatar.service';
import {UploadAvatarProfileUseCasesFactory} from 'infrastructure/factories/upload-avatar-profile-use-cases.factory';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel]),
        AuthModule,
        PatientDataAccessModule,
    ],
    controllers: [PatientController, DoctorController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        UploadAvatarProfileUseCasesFactory,
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
            provide: IUploadAvatarService,
            useClass: UploadAvatarService,
            useFactory: (configService: ConfigService) => {
                return new UploadAvatarService(configService);
            },
            inject: [ConfigService],
        },
    ],
})
export class ProfileModule {}
