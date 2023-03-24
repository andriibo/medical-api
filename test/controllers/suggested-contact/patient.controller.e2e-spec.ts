import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {SuggestedContactModule} from 'infrastructure/modules/suggected-contact/suggested-contact.module';
import {SuggestedContact, User} from 'domain/entities';
import {TestModule} from 'tests/test.module';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {SuggestedContactModel} from 'infrastructure/modules/suggected-contact/models';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {EmergencyContactModel} from 'infrastructure/modules/emergency-contact/models';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
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
};

const suggestedContact: SuggestedContact = {
    id: 'a9d9a7d9-0c0c-43a8-9ebf-bfbf4ecc1463',
    patientUserId: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
    firstName: 'Marc',
    lastName: 'Goldman',
    email: 'suggested@gmail.com',
    phone: '2930412345',
    relationship: 'MedicalProfessional',
    suggestedBy: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
    suggestedAt: '2022-12-10 17:31:07.016236',
};

describe('PatientController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            getByIds: jest.fn(() => Promise.resolve([patient])),
        };
        const mockedSuggestedContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(suggestedContact)),
            delete: jest.fn(() => Promise.resolve()),
            getByPatientUserId: jest.fn(() => Promise.resolve([suggestedContact])),
        };
        const mockedEmergencyContactRepository = {
            create: jest.fn(() => Promise.resolve()),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, SuggestedContactModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(SuggestedContactModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(EmergencyContactModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientCategoryModel))
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .overrideProvider(IPatientCategoryRepository)
            .useValue(null)
            .overrideProvider(IEmergencyContactRepository)
            .useValue(mockedEmergencyContactRepository)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(ISuggestedContactRepository)
            .useValue(mockedSuggestedContactRepository)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient/suggested-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/patient/suggested-contact/${suggestedContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(204);
    });

    it('/patient/suggested-contact/approve/:contactId (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/patient/suggested-contact/approve/${suggestedContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/suggested-contacts (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/patient/suggested-contacts`)
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect([
                {
                    contactId: suggestedContact.id,
                    firstName: suggestedContact.firstName,
                    lastName: suggestedContact.lastName,
                    email: suggestedContact.email,
                    phone: suggestedContact.phone,
                    relationship: suggestedContact.relationship,
                    suggestedAt: convertToUnixTimestamp(suggestedContact.suggestedAt),
                    suggestedByUser: {
                        userId: patient.id,
                        email: patient.email,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        phone: patient.phone,
                        avatar: patient.avatar,
                        role: patient.role,
                        deletedAt: patient.deletedAt,
                    },
                },
            ]);
    });

    afterAll(async () => {
        await app.close();
    });
});
