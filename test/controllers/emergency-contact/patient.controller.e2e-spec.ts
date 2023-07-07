import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {EmergencyContact, User} from 'domain/entities';
import {TestModule} from 'tests/test.module';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PersonEmergencyContactModel} from 'infrastructure/modules/emergency-contact/models';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {EmergencyContactModule} from 'infrastructure/modules';
import {PersonEmergencyContactDto} from 'domain/dtos/request/emergency-contact/person-emergency-contact.dto';
import {convertToUnixTimestamp} from 'support/date.helper';
import {ContactsOrderDto} from "domain/dtos/request/emergency-contact/contacts-order.dto";

const patient: User = {
    id: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
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

const emergencyContact: EmergencyContact = {
    id: 'a9d9a7d9-0c0c-43a8-9ebf-bfbf4ecc1463',
    userId: patient.id,
    firstName: 'Marc',
    lastName: 'Goldman',
    email: 'suggested@gmail.com',
    phone: '2930412345',
    relationship: 'MedicalProfessional',
    createdAt: '2022-12-10 17:31:07.016236',
    rank: null,
};

describe('PatientController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            getByIds: jest.fn(() => Promise.resolve([patient])),
        };
        const mockedEmergencyContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(emergencyContact)),
            create: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
            update: jest.fn(() => Promise.resolve()),
            getByUserIdOrderedByRank: jest.fn(() => Promise.resolve([emergencyContact])),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, EmergencyContactModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PersonEmergencyContactModel))
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

    it('/patient/my-emergency-contact (POST)', async () => {
        const dto: PersonEmergencyContactDto = {
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email@gmail.com',
            phone: '2930412345',
            relationship: 'MedicalProfessional',
        };
        return request(app.getHttpServer())
            .post('/patient/my-emergency-contact')
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(201);
    });

    it('/patient/my-emergency-contacts (GET)', async () => {
        return request(app.getHttpServer())
            .get('/patient/my-emergency-contacts')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect([
                {
                    contactId: emergencyContact.id,
                    firstName: emergencyContact.firstName,
                    lastName: emergencyContact.lastName,
                    email: emergencyContact.email,
                    phone: emergencyContact.phone,
                    relationship: emergencyContact.relationship,
                    createdAt: convertToUnixTimestamp(emergencyContact.createdAt),
                },
            ]);
    });

    it('/patient/my-emergency-contacts/order (PATCH)', async () => {
        const dto: ContactsOrderDto = {
            contactIds: ['a9d9a7d9-0c0c-43a8-9ebf-bfbf4ecc1463'],
        };

        return request(app.getHttpServer())
            .patch('/patient/my-emergency-contacts/order')
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/my-emergency-contact/:contactId (PATCH)', async () => {
        const dto: PersonEmergencyContactDto = {
            firstName: 'firstNameNew',
            lastName: 'lastNameNew',
            email: 'emailnew@gmail.com',
            phone: '2930412325',
            relationship: 'Caregiver',
        };
        return request(app.getHttpServer())
            .patch(`/patient/my-emergency-contact/${emergencyContact.id}`)
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/my-emergency-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/patient/my-emergency-contact/${emergencyContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(400);
    });

    afterAll(async () => {
        await app.close();
    });
});
