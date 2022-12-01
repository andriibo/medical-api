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
import {FileModule} from 'infrastructure/modules/file.module';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {AccessForRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-doctor.service';
import {AccessToGrantedUserBindingService} from 'app/modules/patient-data-access/services/access-to-granted-user-binding.service';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessEventEmitter} from 'infrastructure/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessListener} from 'infrastructure/listeners';
import {DeleteDataAccessByPatientService} from 'app/modules/patient-data-access/services/delete-data-access-by-patient.service';
import {DeleteDataAccessByDoctorService} from 'app/modules/patient-data-access/services/delete-data-access-by-doctor.service';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';
import {AccessForUnregisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-unregistered-doctor.service';
import {AccessToUnregisteredPatientService} from 'app/modules/patient-data-access/services/access-to-unregistered-patient.service';
import {AccessToPatientBindingService} from 'app/modules/patient-data-access/services/access-to-patient-binding.service';

@Module({
    imports: [TypeOrmModule.forFeature([PatientDataAccessModel]), MailModule, AuthModule, FileModule],
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
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessSpecification: PatientDataAccessSpecification,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
            ) => {
                return new DeleteDataAccessByPatientService(
                    patientDataAccessRepository,
                    patientDataAccessSpecification,
                    patientDataAccessEventEmitter,
                );
            },
            inject: [IPatientDataAccessRepository, PatientDataAccessSpecification, IPatientDataAccessEventEmitter],
        },
        {
            provide: DeleteDataAccessByDoctorService,
            useFactory: (
                patientDataAccessRepository: IPatientDataAccessRepository,
                patientDataAccessSpecification: PatientDataAccessSpecification,
                patientDataAccessEventEmitter: IPatientDataAccessEventEmitter,
            ) => {
                return new DeleteDataAccessByDoctorService(
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
