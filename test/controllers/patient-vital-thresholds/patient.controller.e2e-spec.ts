import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientVitalThresholds, User} from 'domain/entities';
import {TestModule} from 'tests/test.module';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientVitalThresholdsModule} from 'infrastructure/modules/patient-vital-thresholds/patient-vital-thresholds.module';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientVitalThresholdsModel} from 'infrastructure/modules/patient-vital-thresholds/models';
import {VitalModel} from 'infrastructure/modules/vital/models';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {convertToUnixTimestamp} from 'app/support/date.helper';

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
    passwordUpdatedAt: '2022-11-12 17:01:27.012109',
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
    passwordUpdatedAt: '2022-11-12 17:01:27.012109',
};

const patientVitalThresholds: PatientVitalThresholds = {
    id: 'af095ce6-97d8-4a49-85c3-03ba5050bfa4',
    patientUserId: patient.id,
    minHr: 40,
    maxHr: 220,
    hrSetBy: null,
    hrSetAt: null,
    minTemp: 32,
    maxTemp: 42,
    tempSetBy: doctor.id,
    tempSetAt: null,
    minSpo2: 40,
    spo2SetBy: null,
    spo2SetAt: null,
    minRr: 4,
    maxRr: 60,
    rrSetBy: null,
    rrSetAt: null,
    minDbp: 30,
    maxDbp: 130,
    dbpSetBy: doctor.id,
    dbpSetAt: null,
    minSbp: 70,
    maxSbp: 220,
    sbpSetBy: null,
    sbpSetAt: null,
    minMap: 43,
    maxMap: 160,
    mapSetBy: doctor.id,
    mapSetAt: null,
    createdAt: new Date().toISOString(),
};

describe('PatientController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            getByIds: jest.fn(() => Promise.resolve([doctor])),
        };
        const mockedPatientVitalThresholdsRepository = {
            getCurrentThresholdsByPatientUserId: jest.fn(() => Promise.resolve(patientVitalThresholds)),
        };
        const mockedVitalRepository = {
            countByThresholdsId: jest.fn(() => Promise.resolve(1)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, PatientVitalThresholdsModule],
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
            .overrideProvider(getRepositoryToken(PatientVitalThresholdsModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(VitalModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(mockedPatientVitalThresholdsRepository)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
            .overrideProvider(IPatientCategoryRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IVitalRepository)
            .useValue(mockedVitalRepository)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient/my-vital-thresholds (GET)', async () => {
        return request(app.getHttpServer())
            .get('/patient/my-vital-thresholds')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect({
                threshold: {
                    isPending: false,
                    thresholdsId: patientVitalThresholds.id,
                    minHr: patientVitalThresholds.minHr,
                    maxHr: patientVitalThresholds.maxHr,
                    hrSetBy: patientVitalThresholds.hrSetBy,
                    hrSetAt: patientVitalThresholds.hrSetAt,
                    minTemp: patientVitalThresholds.minTemp,
                    maxTemp: patientVitalThresholds.maxTemp,
                    tempSetBy: patientVitalThresholds.tempSetBy,
                    tempSetAt: patientVitalThresholds.tempSetAt,
                    minSpo2: patientVitalThresholds.minSpo2,
                    spo2SetBy: patientVitalThresholds.spo2SetBy,
                    spo2SetAt: patientVitalThresholds.spo2SetAt,
                    minRr: patientVitalThresholds.minRr,
                    maxRr: patientVitalThresholds.maxRr,
                    rrSetBy: patientVitalThresholds.rrSetBy,
                    rrSetAt: patientVitalThresholds.rrSetAt,
                    minDbp: patientVitalThresholds.minDbp,
                    maxDbp: patientVitalThresholds.maxDbp,
                    dbpSetBy: patientVitalThresholds.dbpSetBy,
                    dbpSetAt: patientVitalThresholds.dbpSetAt,
                    minSbp: patientVitalThresholds.minSbp,
                    maxSbp: patientVitalThresholds.maxSbp,
                    sbpSetBy: patientVitalThresholds.sbpSetBy,
                    sbpSetAt: patientVitalThresholds.sbpSetAt,
                    minMap: patientVitalThresholds.minMap,
                    maxMap: patientVitalThresholds.maxMap,
                    mapSetBy: patientVitalThresholds.mapSetBy,
                    mapSetAt: patientVitalThresholds.mapSetAt,
                    createdAt: convertToUnixTimestamp(patientVitalThresholds.createdAt),
                },
                users: [
                    {
                        avatar: doctor.avatar,
                        deletedAt: doctor.deletedAt,
                        userId: doctor.id,
                        email: doctor.email,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                        phone: doctor.phone,
                        role: doctor.role,
                        passwordUpdatedAt: convertToUnixTimestamp(doctor.passwordUpdatedAt),
                    },
                ],
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
