import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientDataAccess, PatientVitalThresholds, User} from 'domain/entities';
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
import {BloodPressureThresholdsDto} from 'domain/dtos/request/patient-vital-thresholds/blood-pressure-thresholds.dto';
import {MinMaxThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-max-threshold.dto';
import {MinThresholdDto} from 'domain/dtos/request/patient-vital-thresholds/min-threshold.dto';

const patient: User = {
    id: 'bd58571c-c935-41e9-9e08-a8d4e0e93f5f',
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

const patientDataAccess: PatientDataAccess = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'ToPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
};

describe('DoctorController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(doctor)),
        };
        const mockedPatientVitalThresholdsRepository = {
            getCurrentThresholdsByPatientUserId: jest.fn(() => Promise.resolve(patientVitalThresholds)),
            insert: jest.fn(() => Promise.resolve()),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
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
            .useValue(mockedPatientDataAccessRepository)
            .overrideProvider(IPatientCategoryRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IVitalRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/doctor/blood-pressure/:patientUserId (POST)', async () => {
        const dto: BloodPressureThresholdsDto = {
            minDBP: 35,
            maxDBP: 120,
            minSBP: 75,
            maxSBP: 210,
        };
        return request(app.getHttpServer())
            .post(`/doctor/blood-pressure/${patient.id}`)
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/doctor/blood-pressure/:patientUserId (POST)', async () => {
        const dto: MinMaxThresholdDto = {
            min: 45,
            max: 210,
        };
        return request(app.getHttpServer())
            .post(`/doctor/heart-rate/${patient.id}`)
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/doctor/mean-arterial-pressure/:patientUserId (POST)', async () => {
        const dto: MinMaxThresholdDto = {
            min: 45,
            max: 150,
        };
        return request(app.getHttpServer())
            .post(`/doctor/mean-arterial-pressure/${patient.id}`)
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/doctor/oxygen-saturation/:patientUserId (POST)', async () => {
        const dto: MinThresholdDto = {
            min: 50,
        };
        return request(app.getHttpServer())
            .post(`/doctor/oxygen-saturation/${patient.id}`)
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/doctor/respiration-rate/:patientUserId (POST)', async () => {
        const dto: MinMaxThresholdDto = {
            min: 30,
            max: 40,
        };
        return request(app.getHttpServer())
            .post(`/doctor/respiration-rate/${patient.id}`)
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/doctor/temperature/:patientUserId (POST)', async () => {
        const dto: MinMaxThresholdDto = {
            min: 38,
            max: 40,
        };
        return request(app.getHttpServer())
            .post(`/doctor/temperature/${patient.id}`)
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
