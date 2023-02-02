import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {ProfileModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {DoctorMetadata, User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {TestModule} from 'tests/test.module';
import {UpdateDoctorProfileDto} from 'domain/dtos/request/profile';
import {VitalModel} from 'infrastructure/modules/vital/models';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';

const doctor: User = {
    id: '1nc5e10o-b1w9-239h-c7mk-9af242088lw0',
    email: 'doctor@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Doctor',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};

const doctorMetadata: DoctorMetadata = {
    userId: '1nc5e10o-b1w9-239h-c7mk-9af242088lw0',
    institution: 'institution',
    user: doctor,
};

describe('DoctorController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedRemoveDoctorService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedRemoveCaregiverOrPatientService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedDoctorMetadataRepository = {
            getOneById: jest.fn(() => Promise.resolve(doctorMetadata)),
        };
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(doctor)),
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
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(VitalModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(mockedDoctorMetadataRepository)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
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

    it(`/doctor/my-profile (GET)`, async () => {
        return request(app.getHttpServer())
            .get('/doctor/my-profile')
            .set('Authorization', 'Bearer doctor')
            .expect(200)
            .expect({
                userId: doctor.id,
                email: doctor.email,
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                institution: doctorMetadata.institution,
                phone: doctor.phone,
                avatar: 'https://zenzers-medical-dev.s3.amazonaws.com/avatars/default-avatar.png',
                deletedAt: null,
            });
    });

    it(`/doctor/my-profile (PATCH)`, async () => {
        const dto = new UpdateDoctorProfileDto();
        dto.firstName = 'Test';
        dto.lastName = 'Test';
        dto.phone = '123456789';
        dto.institution = 'test';
        return request(app.getHttpServer())
            .patch('/doctor/my-profile')
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
