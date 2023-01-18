import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {ProfileModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {PatientMetadata, User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {TestModule} from 'tests/test.module';
import {currentUnixTimestamp} from 'app/support/date.helper';

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

const patientMetadata: PatientMetadata = {
    userId: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
    dob: new Date(currentUnixTimestamp() * 1000),
    gender: 'Male',
    height: 180,
    weight: 84,
    user: patient,
};
describe('PatientController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedRemoveDoctorService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedRemoveCaregiverOrPatientService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            persist: jest.fn((user: User) => Promise.resolve(user)),
        };
        const mockedPatientMetadataRepository = {
            getOneById: jest.fn(() => Promise.resolve(patientMetadata)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, ProfileModule],
        })
            .overrideProvider('RemoveDoctorService')
            .useValue(mockedRemoveDoctorService)
            .overrideProvider('RemoveCaregiverOrPatientService')
            .useValue(mockedRemoveCaregiverOrPatientService)
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(mockedPatientMetadataRepository)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it(`/patient/my-profile (GET)`, async () => {
        return request(app.getHttpServer())
            .get('/patient/my-profile')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect({
                userId: patientMetadata.userId,
                email: patient.email,
                firstName: patient.firstName,
                lastName: patient.lastName,
                phone: patient.phone,
                dob: patientMetadata.dob.toISOString(),
                gender: patientMetadata.gender,
                height: patientMetadata.height,
                weight: patientMetadata.weight,
                avatar: 'https://zenzers-medical-dev.s3.amazonaws.com/avatars/default-avatar.png',
                deletedAt: null,
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
