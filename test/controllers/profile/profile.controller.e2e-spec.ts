import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {ProfileModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {TestModule} from 'tests/test.module';
import {VitalModel} from 'infrastructure/modules/vitals/models';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {PatientRelationshipModel} from 'infrastructure/modules/patient-relationship/models';
import {IPatientRelationshipRepository} from 'app/modules/patient-relationship/repositories';

const registeredUser: User = {
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
describe('ProfileController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedRemoveDoctorService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedRemoveCaregiverOrPatientService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(registeredUser)),
            persist: jest.fn((user: User) => Promise.resolve(user)),
            updateAvatar: jest.fn(() => Promise.resolve()),
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
            .overrideProvider(getRepositoryToken(PatientRelationshipModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(VitalModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
            .overrideProvider(IPatientRelationshipRepository)
            .useValue(null)
            .overrideProvider(IVitalRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it(`/avatar/upload (POST)`, async () => {
        return request(app.getHttpServer())
            .post('/avatar/upload')
            .set('Content-Type', 'multipart/form-data')
            .set('Authorization', 'Bearer doctor')
            .attach('file', './test/pineapple.png')
            .expect(200);
    });

    it(`/my-profile/delete (PATCH)`, async () => {
        return request(app.getHttpServer())
            .patch('/my-profile/delete')
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it(`/my-profile/recovery (PATCH)`, async () => {
        return request(app.getHttpServer())
            .patch('/my-profile/recovery')
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
