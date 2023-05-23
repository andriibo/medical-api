import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {SuggestedContactModule} from 'infrastructure/modules/suggected-contact/suggested-contact.module';
import {PatientDataAccess, SuggestedContact, User} from 'domain/entities';
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
import {SuggestedContactDto} from 'domain/dtos/request/suggested-contact/suggested-contact.dto';
import {convertToUnixTimestamp} from 'support/date.helper';

const doctor: User = {
    id: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    email: 'doctor@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Doctor',
    roleLabel: 'Doctor',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
    passwordUpdatedAt: 1681305134,
};

const patient: User = {
    id: 'bd58571c-c935-41e9-9e08-a8d4e0e93f5f',
    email: 'patient@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Patient',
    roleLabel: 'Patient',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
    passwordUpdatedAt: 1681305134,
};

const suggestedContact: SuggestedContact = {
    id: 'a9d9a7d9-0c0c-43a8-9ebf-bfbf4ecc1463',
    patientUserId: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
    firstName: 'Marc',
    lastName: 'Goldman',
    email: 'suggested@gmail.com',
    phone: '2930412345',
    relationship: 'MedicalProfessional',
    suggestedBy: doctor.id,
    suggestedAt: '2022-12-10 17:31:07.016236',
};

const patientDataAccess: PatientDataAccess = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'FromPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
};

describe('GrantedUserController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(doctor)),
            getByIds: jest.fn(() => Promise.resolve([doctor])),
        };
        const mockedSuggestedContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(suggestedContact)),
            getByPatientUserIdAndSuggestedBy: jest.fn(() => Promise.resolve([suggestedContact])),
            create: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
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
            .useValue(null)
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
            .useValue(mockedPatientDataAccessRepository)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/suggested-contact (POST)', async () => {
        const dto: SuggestedContactDto = {
            patientUserId: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
            firstName: 'Marc',
            lastName: 'Goldman',
            email: 'suggested@gmail.com',
            phone: '2930412345',
            relationship: 'MedicalProfessional',
        };
        return request(app.getHttpServer())
            .post('/suggested-contact')
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(201);
    });

    it('/suggested-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/suggested-contact/${suggestedContact.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(204);
    });

    it('/my-suggested-contacts/:patientUserId (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/my-suggested-contacts/${patient.id}`)
            .set('Authorization', 'Bearer doctor')
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
                },
            ]);
    });

    afterAll(async () => {
        await app.close();
    });
});
