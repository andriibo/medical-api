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
import {UpdateCaregiverProfileDto} from 'domain/dtos/request/profile';
import {VitalModel} from 'infrastructure/modules/vitals/models';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';

const caregiver: User = {
    id: '2rc8q18o-c1v2-199c-c8ma-9cf142780lb0',
    email: 'caregiver@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Caregiver',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};

describe('CaregiverController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedRemoveDoctorService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedRemoveCaregiverOrPatientService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(caregiver)),
            persist: jest.fn((user: User) => Promise.resolve(user)),
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
            .overrideProvider(getRepositoryToken(PatientCategoryModel))
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
            .overrideProvider(IPatientCategoryRepository)
            .useValue(null)
            .overrideProvider(IVitalRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it(`/caregiver/my-profile (GET)`, async () => {
        return request(app.getHttpServer())
            .get('/caregiver/my-profile')
            .set('Authorization', 'Bearer caregiver')
            .expect(200)
            .expect({
                userId: caregiver.id,
                email: caregiver.email,
                firstName: caregiver.firstName,
                lastName: caregiver.lastName,
                phone: caregiver.phone,
                avatar: 'https://zenzers-medical-dev.s3.amazonaws.com/avatars/default-avatar.png',
                deletedAt: null,
            });
    });

    it(`/caregiver/my-profile (PATCH)`, async () => {
        const dto = new UpdateCaregiverProfileDto();
        dto.firstName = 'Test';
        dto.lastName = 'Test';
        dto.phone = '123456789';
        return request(app.getHttpServer())
            .patch('/caregiver/my-profile')
            .send(dto)
            .set('Authorization', 'Bearer caregiver')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
