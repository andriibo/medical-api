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

const registeredUser: User = {
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
const patientStatus: PatientStatus = {
    patientUserId: registeredUser.id,
    status: 'Normal',
    setAt: currentUnixTimestamp(),
};
describe('PatientStatusController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(registeredUser)),
        };
        const mockedPatientStatusRepository = {
            getByPatientUserId: jest.fn(() => Promise.resolve(patientStatus)),
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
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(mockedPatientStatusRepository)
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

    afterAll(async () => {
        await app.close();
    });
});
