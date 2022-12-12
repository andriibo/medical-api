import {Module} from '@nestjs/common';
import {PatientController} from 'controllers/patient-data-access';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDataAccessModel} from 'infrastructure/models';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-data-access';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessEntityMapper} from 'infrastructure/mappers/patient-data-access-model.mapper';
import {AuthModule} from 'infrastructure/modules/auth.module';
import {MailModule} from 'infrastructure/modules/mail.module';
import {FileModule} from 'infrastructure/modules/file.module';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {AccessForRegisteredGrantedUserService} from 'app/modules/patient-data-access/services/access-for-registered-granted-user.service';
import {AccessToGrantedUserBindingService} from 'app/modules/patient-data-access/services/access-to-granted-user-binding.service';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessEventEmitter} from 'infrastructure/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessListener} from 'infrastructure/listeners';
import {DeleteDataAccessByPatientService} from 'app/modules/patient-data-access/services/delete-data-access-by-patient.service';
import {DeleteDataAccessByGrantedUserService} from 'app/modules/patient-data-access/services/delete-data-access-by-granted-user.service';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';
import {AccessForUnregisteredGrantedUserService} from 'app/modules/patient-data-access/services/access-for-unregistered-granted-user.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';
import {AccessToPatientBindingService} from 'app/modules/patient-data-access/services/access-to-patient-binding.service';
import {GrantedUserUseCasesFactory} from 'infrastructure/factories/patient-data-access/granted-user-use-cases.factory';
import {GrantedUserController} from 'controllers/patient-data-access/granted-user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PatientDataAccessModel]), MailModule, AuthModule, FileModule],
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
            useClass: PatientDataAccessEntityMapper,
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
            provide: AccessForRegisteredGrantedUserService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForRegisteredGrantedUserService(
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
            provide: AccessForUnregisteredGrantedUserService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForUnregisteredGrantedUserService(
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
            inject: [IPatientDataAccessRepository, PatientDataAccessSpecification, IPatientDataAccessEventEmitter],
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
            inject: [IPatientDataAccessRepository, PatientDataAccessSpecification, IPatientDataAccessEventEmitter],
        },
    ],
})
export class PatientDataAccessModule {}
