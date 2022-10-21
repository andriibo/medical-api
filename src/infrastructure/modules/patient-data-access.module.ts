import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/patient-data-access';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {UserRepository, PatientDataAccessRepository} from 'infrastructure/repositories';
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
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessEventEmitter} from 'infrastructure/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessListener} from 'infrastructure/listeners/patient-data-access.listener';

@Module({
    imports: [TypeOrmModule.forFeature([PatientDataAccessModel]), AuthModule, MailModule],
    exports: [IPatientDataAccessRepository, PatientDataAccessSpecification],
    controllers: [PatientController, DoctorController],
    providers: [
        PatientUseCasesFactory,
        DoctorUseCasesFactory,
        AccessForRegisteredUserService,
        AccessForUnregisteredUserService,
        PatientDataAccessListener,
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
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
            provide: AccessForRegisteredUserService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessEntityMapper: IPatientDataAccessEntityMapper,
                patientDataAccessSpecification: PatientDataAccessSpecification,
            ) => {
                return new AccessForRegisteredUserService(
                    patientDataAccessRepository,
                    patientDataAccessEntityMapper,
                    patientDataAccessSpecification,
                );
            },
            inject: [IPatientDataAccessRepository, IPatientDataAccessEntityMapper, PatientDataAccessSpecification],
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
    ],
})
export class PatientDataAccessModule {}
