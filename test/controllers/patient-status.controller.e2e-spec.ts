import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientStatusModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientCategory} from 'domain/entities/patient-category.entity';

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
const patientCategory: PatientCategory = {
    id: '3db4ddee-78b7-42d3-bb79-c38c9f5b770d',
    patientUserId: patient.id,
    grantedUserId: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    patientCategory: 'Normal',
    patientCategoryUpdatedAt: currentUnixTimestamp(),
};

const patientStatus: PatientStatus = {
    patientUserId: patient.id,
    status: 'Normal',
    setAt: currentUnixTimestamp(),
};
describe('PatientStatusController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
        };
        const mockedPatientStatusRepository = {
            getByPatientUserId: jest.fn(() => Promise.resolve(patientStatus)),
            persist: jest.fn(() => Promise.resolve()),
        };
        const mockedPatientCategoryRepository = {
            getNormalByPatientUserId: jest.fn(() => Promise.resolve([patientCategory])),
            update: jest.fn(() => Promise.resolve()),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, PatientStatusModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientCategoryModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(mockedPatientStatusRepository)
            .overrideProvider(IPatientCategoryRepository)
            .useValue(mockedPatientCategoryRepository)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it(`/patient/my-status (GET)`, async () => {
        return request(app.getHttpServer())
            .get('/patient/my-status')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect({
                status: patientStatus.status,
                setAt: patientStatus.setAt,
            });
    });

    it(`/patient/my-status/normal (PUT)`, async () => {
        return request(app.getHttpServer())
            .put('/patient/my-status/normal')
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it(`/patient/my-status/abnormal (PUT)`, async () => {
        return request(app.getHttpServer())
            .put('/patient/my-status/abnormal')
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
