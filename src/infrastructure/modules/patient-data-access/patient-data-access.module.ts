import {Module} from '@nestjs/common';
import {PatientController} from 'controllers/patient-data-access';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDataAccessModel, PatientDataAccessRepository} from './models';
import {PatientUseCasesFactory, GrantedUserUseCasesFactory} from './factories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessModelMapper} from './mappers/patient-data-access-model.mapper';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {MailModule} from 'infrastructure/modules/mail/mail.module';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {AccessForRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-doctor.service';
import {AccessToGrantedUserBindingService} from 'app/modules/patient-data-access/services/access-to-granted-user-binding.service';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessEventEmitter} from './event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessListener} from './listeners/patient-data-access.listener';
import {DeleteDataAccessByPatientService} from 'app/modules/patient-data-access/services/delete-data-access-by-patient.service';
import {DeleteDataAccessByGrantedUserService} from 'app/modules/patient-data-access/services/delete-data-access-by-granted-user.service';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';
import {AccessForUnregisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-unregistered-doctor.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';
import {AccessToPatientBindingService} from 'app/modules/patient-data-access/services/access-to-patient-binding.service';
import {GrantedUserController} from 'controllers/patient-data-access/granted-user.controller';
import {AccessForRegisteredCaregiverService} from 'app/modules/patient-data-access/services/access-for-registered-caregiver.service';
import {AccessForUnregisteredCaregiverService} from 'app/modules/patient-data-access/services/access-for-unregistered-caregiver.service';
import {IDataAccessApprovedService} from 'app/modules/patient-data-access/services/data-access-approved.service';
import {DataAccessApprovedService} from 'infrastructure/modules/patient-data-access/services/data-access-approved.service';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientStatusModule} from 'infrastructure/modules/patient-status/patient-status.module';
import {PatientCategoryModule} from 'infrastructure/modules/patient-category/patient-category.module';
import {UserModule} from 'infrastructure/modules/auth/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PatientDataAccessModel]),
        MailModule,
        AuthModule,
        UserModule,
        PatientStatusModule,
        PatientCategoryModule,
    ],
    exports: [IPatientDataAccessRepository, PatientDataAccessSpecification],
    controllers: [PatientController, GrantedUserController],
    providers: [
        PatientUseCasesFactory,
        GrantedUserUseCasesFactory,
        PatientDataAccessListener,
        {
            provide: IPatientDataAccessRepository,
            useClass: PatientDataAccessRepository,
        },
        {
            provide: IPatientDataAccessEntityMapper,
            useClass: PatientDataAccessModelMapper,
        },
        {
            provide: IPatientDataAccessEventEmitter,
            useClass: PatientDataAccessEventEmitter,
        },
        {
            provide: PatientDataAccessSpecification,
            useFactory: (
                userRepository: IUserRepository,
                patientDataAccessRepository: IPatientDataAccessRepository,
            ) => {
                return new PatientDataAccessSpecification(userRepository, patientDataAccessRepository);
            },
            inject: [IUserRepository, IPatientDataAccessRepository],
        },
        {
            provide: AccessForRegisteredDoctorService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForRegisteredDoctorService(
                    patientDataAccessRepository,
                    patientDataAccessEntityMapper,
                    patientDataAccessEventEmitter,
                    patientDataAccessSpecification,
                );
            },
            inject: [
                IPatientDataAccessRepository,
                IPatientDataAccessEntityMapper,
                IPatientDataAccessEventEmitter,
                PatientDataAccessSpecification,
            ],
        },
        {
            provide: AccessForRegisteredCaregiverService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForRegisteredCaregiverService(
                    patientDataAccessRepository,
                    patientDataAccessEntityMapper,
                    patientDataAccessEventEmitter,
                    patientDataAccessSpecification,
                );
            },
            inject: [
                IPatientDataAccessRepository,
                IPatientDataAccessEntityMapper,
                IPatientDataAccessEventEmitter,
                PatientDataAccessSpecification,
            ],
        },
        {
            provide: AccessForUnregisteredDoctorService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForUnregisteredDoctorService(
                    patientDataAccessRepository,
                    patientDataAccessEntityMapper,
                    patientDataAccessEventEmitter,
                    patientDataAccessSpecification,
                );
            },
            inject: [
                IPatientDataAccessRepository,
                IPatientDataAccessEntityMapper,
                IPatientDataAccessEventEmitter,
                PatientDataAccessSpecification,
            ],
        },
        {
            provide: AccessForUnregisteredCaregiverService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForUnregisteredCaregiverService(
                    patientDataAccessRepository,
                    patientDataAccessEntityMapper,
                    patientDataAccessEventEmitter,
                    patientDataAccessSpecification,
                );
            },
            inject: [
                IPatientDataAccessRepository,
                IPatientDataAccessEntityMapper,
                IPatientDataAccessEventEmitter,
                PatientDataAccessSpecification,
            ],
        },
        {
            provide: AccessToRegisteredPatientService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessToRegisteredPatientService(
                    patientDataAccessRepository,
                    patientDataAccessEntityMapper,
                    patientDataAccessEventEmitter,
                    patientDataAccessSpecification,
                );
            },
            inject: [
                IPatientDataAccessRepository,
                IPatientDataAccessEntityMapper,
                IPatientDataAccessEventEmitter,
                PatientDataAccessSpecification,
            ],
        },
        {
            provide: AccessToUnregisteredPatientService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessToUnregisteredPatientService(
                    patientDataAccessRepository,
                    patientDataAccessEntityMapper,
                    patientDataAccessEventEmitter,
                    patientDataAccessSpecification,
                );
            },
            inject: [
                IPatientDataAccessRepository,
                IPatientDataAccessEntityMapper,
                IPatientDataAccessEventEmitter,
                PatientDataAccessSpecification,
            ],
        },
        {
            provide: AccessToGrantedUserBindingService,
            useFactory: (patientDataAccessRepository: IPatientDataAccessRepository) => {
                return new AccessToGrantedUserBindingService(patientDataAccessRepository);
            },
            inject: [IPatientDataAccessRepository],
        },
        {
            provide: AccessToPatientBindingService,
            useFactory: (patientDataAccessRepository: IPatientDataAccessRepository) => {
                return new AccessToPatientBindingService(patientDataAccessRepository);
            },
            inject: [IPatientDataAccessRepository],
        },
        {
            provide: DeleteDataAccessByPatientService,
            useFactory: (
                userRepository: IUserRepository,
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessSpecification: PatientDataAccessSpecification,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
            ) => {
                return new DeleteDataAccessByPatientService(
                    userRepository,
                    patientDataAccessRepository,
                    patientDataAccessSpecification,
                    patientDataAccessEventEmitter,
                );
            },
            inject: [
                IUserRepository,
                IPatientDataAccessRepository,
                PatientDataAccessSpecification,
                IPatientDataAccessEventEmitter,
            ],
        },
        {
            provide: DeleteDataAccessByGrantedUserService,
            useFactory: (
                userRepository: IUserRepository,
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessSpecification: PatientDataAccessSpecification,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
            ) => {
                return new DeleteDataAccessByGrantedUserService(
                    userRepository,
                    patientDataAccessRepository,
                    patientDataAccessSpecification,
                    patientDataAccessEventEmitter,
                );
            },
            inject: [
                IUserRepository,
                IPatientDataAccessRepository,
                PatientDataAccessSpecification,
                IPatientDataAccessEventEmitter,
            ],
        },
        {
            provide: IDataAccessApprovedService,
            useFactory: (
                patientStatusRepository: IPatientStatusRepository,
                patientCategoryRepository: IPatientCategoryRepository,
            ) => {
                return new DataAccessApprovedService(patientStatusRepository, patientCategoryRepository);
            },
            inject: [IPatientStatusRepository, IPatientCategoryRepository],
        },
    ],
})
export class PatientDataAccessModule {}
