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
import {UserAvatarUseCasesFactory} from 'infrastructure/factories/user-avatar-use-cases.factory';
import {AvatarController} from 'controllers/profile/avatar.controller';
import {IAWSFileUrlService} from 'app/modules/profile/services/aws-file-url.service';
import {AWSFileUrlService} from 'infrastructure/services/aws-file-url.service';
import {S3Service} from 'infrastructure/aws/s3/s3.service';

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
            provide: S3Service,
            useFactory: (configService: ConfigService) => {
                return new S3Service(configService);
            },
            inject: [ConfigService],
        },
        {
            provide: IAWSFileUrlService,
            useClass: AWSFileUrlService,
            useFactory: (configService: ConfigService) => {
                return new AWSFileUrlService(configService);
            },
            inject: [ConfigService],
        },
    ],
})
export class ProfileModule {}
