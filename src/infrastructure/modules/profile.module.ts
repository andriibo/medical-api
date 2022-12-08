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
import {FileModule} from 'infrastructure/modules/file.module';
import {UserAvatarUseCasesFactory} from 'infrastructure/factories/user-avatar-use-cases.factory';
import {AvatarController} from 'controllers/profile/avatar.controller';
import {CaregiverController} from 'controllers/profile/caregiver.controller';
import {CaregiverUseCasesFactory} from 'infrastructure/factories/profile/caregiver-use-cases.factory';
import {GrantedUserController} from 'controllers/profile/granted-user.controller';
import {GrantedUserUseCasesFactory} from 'infrastructure/factories/profile/granted-user-use-cases.factory';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel]),
        AuthModule,
        PatientDataAccessModule,
        FileModule,
    ],
    controllers: [PatientController, DoctorController, AvatarController, CaregiverController, GrantedUserController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        UserAvatarUseCasesFactory,
        CaregiverUseCasesFactory,
        GrantedUserUseCasesFactory,
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
    ],
})
export class ProfileModule {}
