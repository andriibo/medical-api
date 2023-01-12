import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/profile';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'infrastructure/modules/auth/models';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UserProfileMapper} from './mappers/user-profile.mapper';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {FileModule} from 'infrastructure/modules/file/file.module';
import {ProfileController} from 'controllers/profile/profile.controller';
import {CaregiverController} from 'controllers/profile/caregiver.controller';
import {GrantedUserController} from 'controllers/profile/granted-user.controller';
import {
    CaregiverUseCasesFactory,
    DoctorUseCasesFactory,
    GrantedUserUseCasesFactory,
    PatientUseCasesFactory,
    ProfileUseCasesFactory,
} from './factories';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';
import {RemoveCaregiverOrPatientService} from 'infrastructure/modules/profile/services/remove-caregiver-or-patient.service';
import {IRemoveCaregiverOrPatientService} from 'app/modules/profile/services/remove-caregiver-or-patient.service';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {DataSource} from 'typeorm';
import {IRemoveDoctorService} from 'app/modules/profile/services/remove-doctor.service';
import {RemoveDoctorService} from 'infrastructure/modules/profile/services/remove-doctor.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel]),
        AuthModule,
        PatientDataAccessModule,
        FileModule,
    ],
    exports: [IRemoveDoctorService, IRemoveCaregiverOrPatientService],
    controllers: [PatientController, DoctorController, ProfileController, CaregiverController, GrantedUserController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        ProfileUseCasesFactory,
        CaregiverUseCasesFactory,
        GrantedUserUseCasesFactory,
        {
            provide: ProfileSpecification,
            useClass: ProfileSpecification,
        },
        {
            provide: IUserProfileMapper,
            useClass: UserProfileMapper,
        },
        {
            provide: IRemoveCaregiverOrPatientService,
            useClass: RemoveCaregiverOrPatientService,
            useFactory: (authService: IAuthService, dataSource: DataSource) => {
                return new RemoveCaregiverOrPatientService(authService, dataSource);
            },
            inject: [IAuthService, DataSource],
        },
        {
            provide: IRemoveDoctorService,
            useClass: RemoveDoctorService,
            useFactory: (authService: IAuthService, dataSource: DataSource) => {
                return new RemoveDoctorService(authService, dataSource);
            },
            inject: [IAuthService, DataSource],
        },
    ],
})
export class ProfileModule {}
