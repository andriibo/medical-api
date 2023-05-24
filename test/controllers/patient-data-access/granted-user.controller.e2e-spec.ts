import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientDataAccess, User} from 'domain/entities';
import {TestModule} from 'tests/test.module';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessModule} from 'infrastructure/modules';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientDataAccessEntityMapper} from 'app/modules/patient-data-access/mappers/patient-data-access-entity.mapper';
import {IPatientDataAccessEventEmitter} from 'app/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {PatientDataAccessModelMapper} from 'infrastructure/modules/patient-data-access/mappers/patient-data-access-model.mapper';
import {PatientDataAccessEventEmitter} from 'infrastructure/modules/patient-data-access/event-emitters/patient-data-access.event-emitter';
import {IMailSender} from 'app/modules/mail/services/abstract/mail-sender';
import {IDeepLinkService} from 'app/modules/mail/services/deep-link.service';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {currentUnixTimestamp} from 'support/date.helper';
import {AccessToRegisteredPatientService} from 'app/modules/patient-data-access/services/access-to-registered-patient.service';

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

const patientDataAccess: PatientDataAccess = {
    id: 'f7c5009e-dd15-41f0-a8f9-77e69aa87c99',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'FromPatient',
    status: 'Initiated',
    createdAt: new Date().toISOString(),
    patientUser: patient,
    lastInviteSentAt: 0,
};

const patientStatus: PatientStatus = {
    patientUserId: patient.id,
    status: 'Normal',
    setAt: currentUnixTimestamp(),
};

describe('GrantedUserController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(doctor)),
            getOneByEmail: jest.fn(() => Promise.resolve(patient)),
            getOneByIdOrFail: jest.fn(() => Promise.resolve(doctor)),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(null)),
            getOneById: jest.fn(() => Promise.resolve(patientDataAccess)),
            create: jest.fn(() => Promise.resolve()),
            update: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
            getWithPatientUserByGrantedUserId: jest.fn(() => Promise.resolve([patientDataAccess])),
        };
        const mockedMailSender = {
            sendMail: jest.fn(() => Promise.resolve()),
        };
        const mockedDeepLinkService = {
            getRequestsLinkForPatient: jest.fn(() => Promise.resolve('')),
        };
        const mockedPatientStatusRepository = {
            getByPatientUserId: jest.fn(() => Promise.resolve(patientStatus)),
        };
        const mockedPatientCategoryRepository = {
            updateCategoryAndUpdatedAtById: jest.fn(() => Promise.resolve()),
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
            ],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientCategoryModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .overrideProvider(IPatientCategoryRepository)
            .useValue(mockedPatientCategoryRepository)
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

    it('/data-access/initiate (POST)', async () => {
        return request(app.getHttpServer())
            .post('/data-access/initiate')
            .send({email: 'patient@gmail.com'})
            .set('Authorization', 'Bearer doctor')
            .expect(201);
    });

    it('/data-access/refuse/:accessId (PATCH)', async () => {
        return request(app.getHttpServer())
            .patch(`/data-access/refuse/${patientDataAccess.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/data-access/approve/:accessId (PATCH)', async () => {
        patientDataAccess.status = 'Initiated';
        return request(app.getHttpServer())
            .patch(`/data-access/approve/${patientDataAccess.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/data-access/resend/:accessId (PATCH)', async () => {
        patientDataAccess.status = 'Initiated';
        patientDataAccess.direction = 'ToPatient';
        return request(app.getHttpServer())
            .patch(`/data-access/resend/${patientDataAccess.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/data-accesses (GET)', async () => {
        return request(app.getHttpServer())
            .get('/data-accesses')
            .set('Authorization', 'Bearer doctor')
            .expect(200)
            .expect([
                {
                    accessId: patientDataAccess.id,
                    direction: patientDataAccess.direction,
                    status: patientDataAccess.status,
                    createdAt: patientDataAccess.createdAt,
                    lastInviteSentAt: patientDataAccess.lastInviteSentAt,
                    requestedUser: {
                        avatar: patient.avatar,
                        deletedAt: patient.deletedAt,
                        userId: patient.id,
                        email: patient.email,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        phone: patient.phone,
                        role: patient.role,
                        roleLabel: patient.roleLabel,
                        passwordUpdatedAt: patient.passwordUpdatedAt,
                    },
                },
            ]);
    });

    it('/data-access/:accessId (DELETE)', async () => {
        patientDataAccess.direction = 'ToPatient';
        return request(app.getHttpServer())
            .delete(`/data-access/${patientDataAccess.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(204);
    });

    afterAll(async () => {
        await app.close();
    });
});
