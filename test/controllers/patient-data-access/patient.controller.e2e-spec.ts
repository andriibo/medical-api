import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {User} from 'domain/entities';
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
import {AccessForRegisteredDoctorService} from 'app/modules/patient-data-access/services/access-for-registered-doctor.service';
import {IMailSender} from 'app/modules/mail/services/abstract/mail-sender';
import {IDeepLinkService} from 'app/modules/mail/services/deep-link.service';
import {AccessForUnregisteredCaregiverService} from 'app/modules/patient-data-access/services/access-for-unregistered-caregiver.service';

const patient: User = {
    id: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
    email: 'patient@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Patient',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};

const doctor: User = {
    id: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    email: 'doctor@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Doctor',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};

const users = {
    'doctor@gmail.com': doctor,
    'caregiver@gmail.com': null,
};

describe('PatientController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            getOneByEmail: jest.fn((email: string) => Promise.resolve(users[email])),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(null)),
            getOneByPatientUserIdAndGrantedEmail: jest.fn(() => Promise.resolve(null)),
            create: jest.fn(() => Promise.resolve()),
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
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
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

    afterAll(async () => {
        await app.close();
    });
});
