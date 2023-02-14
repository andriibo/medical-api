import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientCategoryModule} from 'infrastructure/modules/patient-category/patient-category.module';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {PatientDataAccess, User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientCategory} from 'domain/entities/patient-category.entity';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';

const patient: User = {
    id: '862108e8-32f6-4d37-840e-2db213f0c2fe',
    email: 'patient@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Patient',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};

const patientDataAccess: PatientDataAccess = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: '862108e8-32f6-4d37-840e-2db213f0c2fe',
    direction: 'ToPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
};
const patientCategory: PatientCategory = {
    id: '3db4ddee-78b7-42d3-bb79-c38c9f5b770d',
    patientUserId: patient.id,
    grantedUserId: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    patientCategory: 'Abnormal',
    patientCategoryUpdatedAt: currentUnixTimestamp(),
};

describe('PatientCategoryController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
        };
        const mockedPatientCategoryRepository = {
            update: jest.fn(() => Promise.resolve()),
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientCategory)),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, PatientCategoryModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientCategoryModel))
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
            .overrideProvider(IPatientCategoryRepository)
            .useValue(mockedPatientCategoryRepository)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(mockedPatientDataAccessRepository)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient-category/normal/:patientUserId (PATCH)', async () => {
        return request(app.getHttpServer())
            .patch(`/patient-category/normal/${patient.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/patient-category/borderline/:patientUserId (PATCH)', async () => {
        patientCategory.patientCategory = 'Abnormal';
        return request(app.getHttpServer())
            .patch(`/patient-category/borderline/${patient.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
