import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientDataAccess, User} from 'domain/entities';
import {TestModule} from 'tests/test.module';
import {getRepositoryToken} from '@nestjs/typeorm';
import {
    DoctorMetadataModel,
    PatientMetadataModel,
    UserModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IUserRepository} from 'app/modules/auth/repositories';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessModule} from 'infrastructure/modules';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessModelMapper} from 'infrastructure/modules/patient-data-access/mappers/patient-data-access-model.mapper';
import {PatientDataAccessEventEmitter} from 'infrastructure/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {AccessForRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-doctor.service';
import {IMailSender} from 'app/modules/mail/services/abstract/mail-sender';
import {IDeepLinkService} from 'app/modules/mail/services/deep-link.service';
import {AccessForUnregisteredCaregiverService} from 'app/modules/patient-data-access/services/access-for-unregistered-caregiver.service';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {currentUnixTimestamp} from 'support/date.helper';
import {PatientStatusEnum} from 'domain/constants/patient.const';

const patient: User = {
    id: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
    email: 'patient@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Patient',
    roleLabel: 'Patient',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
    passwordUpdatedAt: 1681305134,
};

const doctor: User = {
    id: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    email: 'doctor@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Doctor',
    roleLabel: 'Doctor',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
    passwordUpdatedAt: 1681305134,
};

const users = {
    'doctor@gmail.com': doctor,
    'caregiver@gmail.com': null,
};

const patientDataAccess: PatientDataAccess = {
    id: 'f7c5009e-dd15-41f0-a8f9-77e69aa87c99',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'ToPatient',
    status: 'Initiated',
    createdAt: new Date().toISOString(),
    grantedUser: doctor,
    lastInviteSentAt: 0,
};

const patientStatus: PatientStatus = {
    patientUserId: patient.id,
    status: PatientStatusEnum.Normal,
    setBy: patient.id,
    setAt: currentUnixTimestamp(),
};

describe('PatientController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            getOneByEmail: jest.fn((email: string) => Promise.resolve(users[email])),
            getOneByIdOrFail: jest.fn(() => Promise.resolve(doctor)),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(null)),
            getOneByPatientUserIdAndGrantedEmail: jest.fn(() => Promise.resolve(null)),
            getOneById: jest.fn(() => Promise.resolve(patientDataAccess)),
            create: jest.fn(() => Promise.resolve()),
            update: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
            getWithGrantedUserByPatientUserId: jest.fn(() => Promise.resolve([patientDataAccess])),
        };
        const mockedPatientStatusRepository = {
            getByPatientUserId: jest.fn(() => Promise.resolve(patientStatus)),
        };
        const mockedMailSender = {
            sendMail: jest.fn(() => Promise.resolve()),
        };
        const mockedDeepLinkService = {
            getRequestsLinkForGrantedUser: jest.fn(() => Promise.resolve('')),
            getSignUpLinkForCaregiver: jest.fn(() => Promise.resolve('')),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, PatientDataAccessModule],
            providers: [
                {
                    provide: IPatientDataAccessRepository,
                    useValue: mockedPatientDataAccessRepository,
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
            ],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(CaregiverMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(ICaregiverMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(mockedPatientStatusRepository)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(mockedPatientDataAccessRepository)
            .overrideProvider(IMailSender)
            .useValue(mockedMailSender)
            .overrideProvider(IDeepLinkService)
            .useValue(mockedDeepLinkService)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient/data-access/initiate-for-doctor (POST)', async () => {
        return request(app.getHttpServer())
            .post('/patient/data-access/initiate-for-doctor')
            .send({email: 'doctor@gmail.com'})
            .set('Authorization', 'Bearer patient')
            .expect(201);
    });

    it('/patient/data-access/initiate-for-caregiver (POST)', async () => {
        return request(app.getHttpServer())
            .post('/patient/data-access/initiate-for-caregiver')
            .send({email: 'caregiver@gmail.com'})
            .set('Authorization', 'Bearer patient')
            .expect(201);
    });

    it('/patient/data-access/refuse/:accessId (PATCH)', async () => {
        return request(app.getHttpServer())
            .patch(`/patient/data-access/refuse/${patientDataAccess.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/data-access/approve/:accessId (PATCH)', async () => {
        patientDataAccess.status = 'Initiated';
        return request(app.getHttpServer())
            .patch(`/patient/data-access/approve/${patientDataAccess.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/data-accesses (GET)', async () => {
        return request(app.getHttpServer())
            .get('/patient/data-accesses')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect([
                {
                    accessId: patientDataAccess.id,
                    direction: patientDataAccess.direction,
                    status: patientDataAccess.status,
                    createdAt: patientDataAccess.createdAt,
                    lastInviteSentAt: patientDataAccess.lastInviteSentAt,
                    requestedUser: {
                        avatar: doctor.avatar,
                        deletedAt: doctor.deletedAt,
                        userId: doctor.id,
                        email: doctor.email,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                        phone: doctor.phone,
                        role: doctor.role,
                        roleLabel: doctor.roleLabel,
                        passwordUpdatedAt: doctor.passwordUpdatedAt,
                    },
                },
            ]);
    });

    it('/patient/data-access/:accessId (DELETE)', async () => {
        patientDataAccess.direction = 'FromPatient';
        return request(app.getHttpServer())
            .delete(`/patient/data-access/${patientDataAccess.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(204);
    });

    afterAll(async () => {
        await app.close();
    });
});
