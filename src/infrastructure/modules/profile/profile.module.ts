import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/profile';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'infrastructure/modules/auth/models';
import {IUserProfileMapper} from 'app/modules/profile/mappers/user-profile.mapper';
import {UserProfileMapper} from './mappers/user-profile.mapper';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {FileModule} from 'infrastructure/modules/file/file.module';
import {VitalModule} from 'infrastructure/modules/vital/vital.module';
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
import {IMyPatientsService} from 'app/modules/profile/services/my-patients.service';
import {MyPatientsService} from 'infrastructure/modules/profile/services/my-patients.service';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {PatientCategoryModule} from 'infrastructure/modules/patient-category/patient-category.module';
import {ProfileIndependentModule} from 'infrastructure/modules/profile/profile.ind.module';
import {AuthIndependentModule} from 'infrastructure/modules/auth/auth.ind.module';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel]),
        AuthModule,
        AuthIndependentModule,
        PatientCategoryModule,
        PatientDataAccessModule,
        FileModule,
        VitalModule,
        ProfileIndependentModule,
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
        {
            provide: IMyPatientsService,
            useFactory: (
                patientCategoryRepository: IPatientCategoryRepository,
                userDtoService: UserDtoService,
                vitalRepository: IVitalRepository,
            ) => {
                return new MyPatientsService(patientCategoryRepository, userDtoService, vitalRepository);
            },
            inject: [IPatientCategoryRepository, UserDtoService, IVitalRepository],
        },
    ],
})
export class ProfileModule {}
