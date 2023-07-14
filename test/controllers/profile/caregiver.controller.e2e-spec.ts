import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {ProfileModule} from 'infrastructure/modules/profile/profile.module';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {
    DoctorMetadataModel,
    PatientMetadataModel,
    UserModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {CaregiverMetadata, User} from 'domain/entities';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {TestModule} from 'tests/test.module';
import {UpdateCaregiverProfileDto} from 'domain/dtos/request/profile';
import {VitalModel} from 'infrastructure/modules/vital/models';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {IRemoveMyAvatarService} from 'app/modules/profile/services/remove-my-avatar.service';

const caregiver: User = {
    id: '2rc8q18o-c1v2-199c-c8ma-9cf142780lb0',
    email: 'caregiver@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Caregiver',
    roleLabel: 'CaregiverProfessional',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
    passwordUpdatedAt: 1681305134,
};

const caregiverMetadata: CaregiverMetadata = {
    userId: caregiver.id,
    institution: 'institution',
    user: caregiver,
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
        const mockedCaregiverMetadataRepository = {
            getOneById: jest.fn(() => Promise.resolve(caregiverMetadata)),
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
            .overrideProvider(IRemoveMyAvatarService)
            .useValue(null)
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(CaregiverMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
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
            .useValue(null)
            .overrideProvider(ICaregiverMetadataRepository)
            .useValue(mockedCaregiverMetadataRepository)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IVitalRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/caregiver/my-profile (GET)', async () => {
        return request(app.getHttpServer())
            .get('/caregiver/my-profile')
            .set('Authorization', 'Bearer caregiver')
            .expect(200)
            .expect({
                userId: caregiver.id,
                email: caregiver.email,
                firstName: caregiver.firstName,
                lastName: caregiver.lastName,
                institution: caregiverMetadata.institution,
                phone: caregiver.phone,
                role: caregiver.role,
                roleLabel: caregiver.roleLabel,
                avatar: caregiver.avatar,
                deletedAt: null,
                passwordUpdatedAt: caregiver.passwordUpdatedAt,
            });
    });

    it('/caregiver/my-profile (PATCH)', async () => {
        const dto = new UpdateCaregiverProfileDto();
        dto.firstName = 'Test';
        dto.lastName = 'Test';
        dto.phone = '123456789';
        dto.institution = 'test';
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
