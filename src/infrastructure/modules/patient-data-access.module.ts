import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/patient-data-access';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDataAccessModel} from 'infrastructure/models';
import {PatientUseCasesFactory, DoctorUseCasesFactory} from 'infrastructure/factories/patient-data-access';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessEntityMapper} from 'infrastructure/mappers/patient-data-access-model.mapper';
import {AuthModule} from 'infrastructure/modules/auth.module';
import {MailModule} from 'infrastructure/modules/mail.module';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {AccessForRegisteredUserService} from 'app/modules/patient-data-access/services/access-for-registered-user.service';
import {AccessForUnregisteredUserService} from 'app/modules/patient-data-access/services/access-for-unregistered-user.service';
import {AccessToGrantedUserBindingService} from 'app/modules/patient-data-access/services/access-to-granted-user-binding.service';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessEventEmitter} from 'infrastructure/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessListener} from 'infrastructure/listeners';
import {DeletePatientDataAccessService} from 'app/modules/patient-data-access/services/delete-patient-data-access.service';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IDoctorDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/doctor-data-access.event-emitter';
import {DeleteDoctorDataAccessService} from 'app/modules/patient-data-access/services/delete-doctor-data-access.service';
import {DoctorDataAccessEventEmitter} from "infrastructure/event-emitters/doctor-data-access.event-emitter";

@Module({
    imports: [TypeOrmModule.forFeature([PatientDataAccessModel]), MailModule, AuthModule],
    exports: [IPatientDataAccessRepository, PatientDataAccessSpecification],
    controllers: [PatientController, DoctorController],
    providers: [
        PatientUseCasesFactory,
        DoctorUseCasesFactory,
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
            provide: IDoctorDataAccessEventEmitter,
            useClass: DoctorDataAccessEventEmitter,
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
            provide: AccessForRegisteredUserService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForRegisteredUserService(
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
            provide: AccessForUnregisteredUserService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForUnregisteredUserService(
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
            provide: DeletePatientDataAccessService,
            useFactory: (
                userRepository: IUserRepository,
                patientDataAccessRepository: IPatientDataAccessRepository,
                authedUserService: IAuthedUserService,
                patientDataAccessSpecification: PatientDataAccessSpecification,
                doctorDataAccessEventEmitter: IDoctorDataAccessEventEmitter,
            ) => {
                return new DeletePatientDataAccessService(
                    userRepository,
                    patientDataAccessRepository,
                    authedUserService,
                    patientDataAccessSpecification,
                    doctorDataAccessEventEmitter,
                );
            },
            inject: [
                IUserRepository,
                IPatientDataAccessRepository,
                IAuthedUserService,
                PatientDataAccessSpecification,
                IDoctorDataAccessEventEmitter,
            ],
        },
        {
            provide: DeleteDoctorDataAccessService,
            useFactory: (
                userRepository: IUserRepository,
                patientDataAccessRepository: IPatientDataAccessRepository,
                authedUserService: IAuthedUserService,
                patientDataAccessSpecification: PatientDataAccessSpecification,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
            ) => {
                return new DeleteDoctorDataAccessService(
                    userRepository,
                    patientDataAccessRepository,
                    authedUserService,
                    patientDataAccessSpecification,
                    patientDataAccessEventEmitter,
                );
            },
            inject: [
                IUserRepository,
                IPatientDataAccessRepository,
                IAuthedUserService,
                PatientDataAccessSpecification,
                IPatientDataAccessEventEmitter,
            ],
        },
    ],
})
export class PatientDataAccessModule {}
