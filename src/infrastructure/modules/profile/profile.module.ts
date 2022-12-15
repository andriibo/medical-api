import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/profile';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'infrastructure/modules/auth/models';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UserProfileMapper} from './mappers/user-profile.mapper';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {FileModule} from 'infrastructure/modules/file/file.module';
import {AvatarController} from 'controllers/profile/avatar.controller';
import {CaregiverController} from 'controllers/profile/caregiver.controller';
import {GrantedUserController} from 'controllers/profile/granted-user.controller';
import {
    CaregiverUseCasesFactory,
    DoctorUseCasesFactory,
    GrantedUserUseCasesFactory,
    PatientUseCasesFactory,
    UserAvatarUseCasesFactory,
} from './factories';

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
            provide: IUserProfileMapper,
            useClass: UserProfileMapper,
        },
    ],
})
export class ProfileModule {}
