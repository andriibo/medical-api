import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PersonEmergencyContact, User} from 'domain/entities';
import {OrganizationEmergencyContact, OrganizationType} from 'domain/entities/organization-emergency-contact.entity';
import {TestModule} from 'tests/test.module';
import {getRepositoryToken} from '@nestjs/typeorm';
import {
    DoctorMetadataModel,
    PatientMetadataModel,
    UserModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {
    PersonEmergencyContactModel,
    OrganizationEmergencyContactModel,
} from 'infrastructure/modules/emergency-contact/models';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {
    IPersonEmergencyContactRepository,
    IOrganizationEmergencyContactRepository,
} from 'app/modules/emergency-contact/repositories';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IUserRepository} from 'app/modules/auth/repositories';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {EmergencyContactModule} from 'infrastructure/modules';
import {PersonEmergencyContactDto} from 'domain/dtos/request/emergency-contact/person-emergency-contact.dto';
import {OrganizationEmergencyContactDto} from 'domain/dtos/request/emergency-contact/organization-emergency-contact.dto';
import {convertToUnixTimestamp} from 'support/date.helper';
import {ContactsOrderDto} from 'domain/dtos/request/emergency-contact/contacts-order.dto';

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

const personEmergencyContact: PersonEmergencyContact = {
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

const organizationEmergencyContact: OrganizationEmergencyContact = {
    id: 'a9d9a7d9-0c0c-43a8-9ebf-bfbf4ecc1464',
    userId: patient.id,
    name: 'Marc',
    email: 'suggested@gmail.com',
    phone: '2930412345',
    fax: '2930412345',
    type: OrganizationType.Pharmacy,
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
        const mockedPersonEmergencyContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(personEmergencyContact)),
            create: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
            update: jest.fn(() => Promise.resolve()),
            getByUserIdOrderedByRank: jest.fn(() => Promise.resolve([personEmergencyContact])),
        };
        const mockedOrganizationEmergencyContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(organizationEmergencyContact)),
            create: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
            update: jest.fn(() => Promise.resolve()),
            getByUserIdOrderedByRank: jest.fn(() => Promise.resolve([organizationEmergencyContact])),
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
            .overrideProvider(getRepositoryToken(CaregiverMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PersonEmergencyContactModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(OrganizationEmergencyContactModel))
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
            .overrideProvider(IPersonEmergencyContactRepository)
            .useValue(mockedPersonEmergencyContactRepository)
            .overrideProvider(IOrganizationEmergencyContactRepository)
            .useValue(mockedOrganizationEmergencyContactRepository)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(ICaregiverMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient/person-emergency-contact (POST)', async () => {
        const dto: PersonEmergencyContactDto = {
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email@gmail.com',
            phone: '2930412345',
            relationship: 'MedicalProfessional',
        };
        return request(app.getHttpServer())
            .post('/patient/person-emergency-contact')
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(201);
    });

    it('/patient/organization-emergency-contact (POST)', async () => {
        const dto: OrganizationEmergencyContactDto = {
            name: 'lastName',
            email: 'email@gmail.com',
            phone: '2930412345',
            fax: null,
            type: OrganizationType.Pharmacy,
        };
        return request(app.getHttpServer())
            .post('/patient/organization-emergency-contact')
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(201);
    });

    it('/patient/emergency-contacts (GET)', async () => {
        return request(app.getHttpServer())
            .get('/patient/emergency-contacts')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect({
                persons: [
                    {
                        contactId: personEmergencyContact.id,
                        firstName: personEmergencyContact.firstName,
                        lastName: personEmergencyContact.lastName,
                        email: personEmergencyContact.email,
                        phone: personEmergencyContact.phone,
                        relationship: personEmergencyContact.relationship,
                        createdAt: convertToUnixTimestamp(personEmergencyContact.createdAt),
                    },
                ],
                organizations: [
                    {
                        contactId: organizationEmergencyContact.id,
                        name: organizationEmergencyContact.name,
                        email: organizationEmergencyContact.email,
                        phone: organizationEmergencyContact.phone,
                        fax: organizationEmergencyContact.fax,
                        type: organizationEmergencyContact.type,
                        createdAt: convertToUnixTimestamp(organizationEmergencyContact.createdAt),
                    },
                ],
            });
    });

    it('/patient/person-emergency-contacts/order (PATCH)', async () => {
        const dto: ContactsOrderDto = {
            contactIds: [personEmergencyContact.id],
        };

        return request(app.getHttpServer())
            .patch('/patient/person-emergency-contacts/order')
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/organization-emergency-contacts/order (PATCH)', async () => {
        const dto: ContactsOrderDto = {
            contactIds: [organizationEmergencyContact.id],
        };

        return request(app.getHttpServer())
            .patch('/patient/organization-emergency-contacts/order')
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/person-emergency-contact/:contactId (PATCH)', async () => {
        const dto: PersonEmergencyContactDto = {
            firstName: 'firstNameNew',
            lastName: 'lastNameNew',
            email: 'emailnew@gmail.com',
            phone: '2930412325',
            relationship: 'Caregiver',
        };
        return request(app.getHttpServer())
            .patch(`/patient/person-emergency-contact/${personEmergencyContact.id}`)
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/organization-emergency-contact/:contactId (PATCH)', async () => {
        const dto: OrganizationEmergencyContactDto = {
            name: 'lastNameNew',
            email: null,
            phone: '2930412325',
            fax: '2930412325',
            type: OrganizationType.Pharmacy,
        };
        return request(app.getHttpServer())
            .patch(`/patient/organization-emergency-contact/${organizationEmergencyContact.id}`)
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/person-emergency-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/patient/person-emergency-contact/${personEmergencyContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(400);
    });

    it('/patient/organization-emergency-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/patient/organization-emergency-contact/${organizationEmergencyContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(204);
    });

    afterAll(async () => {
        await app.close();
    });
});
