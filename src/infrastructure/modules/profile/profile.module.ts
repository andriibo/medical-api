import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/profile';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'infrastructure/modules/auth/models';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UserProfileMapper} from './mappers/user-profile.mapper';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {FileModule} from 'infrastructure/modules/file/file.module';
import {VitalModule} from 'infrastructure/modules/vitals/vital.module';
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
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {DataSource} from 'typeorm';
import {RemoveDoctorService} from 'infrastructure/modules/profile/services/remove-doctor.service';
import {RemoveCaregiverOrPatientService} from 'infrastructure/modules/profile/services/remove-caregiver-or-patient.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel]),
        AuthModule,
        PatientDataAccessModule,
        FileModule,
        VitalModule,
    ],
    exports: ['RemoveDoctorService', 'RemoveCaregiverOrPatientService'],
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
            provide: 'RemoveDoctorService',
            useFactory: (authService: IAuthService, dataSource: DataSource) => {
                return new RemoveDoctorService(authService, dataSource);
            },
            inject: [IAuthService, DataSource],
        },
        {
            provide: 'RemoveCaregiverOrPatientService',
            useFactory: (authService: IAuthService, dataSource: DataSource) => {
                return new RemoveCaregiverOrPatientService(authService, dataSource);
            },
            inject: [IAuthService, DataSource],
        },
    ],
})
export class ProfileModule {}
