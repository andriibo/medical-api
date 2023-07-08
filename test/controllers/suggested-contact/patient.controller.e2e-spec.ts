import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {SuggestedContactModule} from 'infrastructure/modules/suggected-contact/suggested-contact.module';
import {PersonSuggestedContact, OrganizationSuggestedContact, User} from 'domain/entities';
import {TestModule} from 'tests/test.module';
import {getRepositoryToken} from '@nestjs/typeorm';
import {
    DoctorMetadataModel,
    PatientMetadataModel,
    UserModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {
    PersonSuggestedContactModel,
    OrganizationSuggestedContactModel,
} from 'infrastructure/modules/suggected-contact/models';
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
import {
    IPersonSuggestedContactRepository,
    IOrganizationSuggestedContactRepository,
} from 'app/modules/suggested-contact/repositories';
import {IUserRepository} from 'app/modules/auth/repositories';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {convertToUnixTimestamp} from 'support/date.helper';
import {OrganizationType} from 'domain/entities/organization-emergency-contact.entity';

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

const personSuggestedContact: PersonSuggestedContact = {
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

const organizationSuggestedContact: OrganizationSuggestedContact = {
    id: 'a9d9a7d9-0c0c-43a8-9ebf-bfbf4ecc1463',
    patientUserId: patient.id,
    name: 'Marc',
    email: 'suggested@gmail.com',
    phone: '2930412345',
    fax: '2930412345',
    type: OrganizationType.Pharmacy,
    suggestedAt: '2022-12-10 17:31:07.016236',
    suggestedBy: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
};

describe('PatientController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            getByIds: jest.fn(() => Promise.resolve([patient])),
        };
        const mockedPersonSuggestedContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(personSuggestedContact)),
            delete: jest.fn(() => Promise.resolve()),
            getByPatientUserId: jest.fn(() => Promise.resolve([personSuggestedContact])),
        };
        const mockedOrganizationSuggestedContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(organizationSuggestedContact)),
            delete: jest.fn(() => Promise.resolve()),
            getByPatientUserId: jest.fn(() => Promise.resolve([organizationSuggestedContact])),
        };
        const mockedPersonEmergencyContactRepository = {
            create: jest.fn(() => Promise.resolve()),
        };
        const mockedOrganizationEmergencyContactRepository = {
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
            .overrideProvider(getRepositoryToken(CaregiverMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PersonSuggestedContactModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(OrganizationSuggestedContactModel))
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
            .overrideProvider(IPersonSuggestedContactRepository)
            .useValue(mockedPersonSuggestedContactRepository)
            .overrideProvider(IOrganizationSuggestedContactRepository)
            .useValue(mockedOrganizationSuggestedContactRepository)
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

    it('/patient/person-suggested-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/patient/person-suggested-contact/${personSuggestedContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(204);
    });

    it('/patient/organization-suggested-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/patient/organization-suggested-contact/${organizationSuggestedContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(204);
    });

    it('/patient/person-suggested-contact/approve/:contactId (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/patient/person-suggested-contact/approve/${personSuggestedContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/organization-suggested-contact/approve/:contactId (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/patient/organization-suggested-contact/approve/${organizationSuggestedContact.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/suggested-contacts (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/patient/suggested-contacts`)
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect({
                persons: [
                    {
                        contactId: personSuggestedContact.id,
                        firstName: personSuggestedContact.firstName,
                        lastName: personSuggestedContact.lastName,
                        email: personSuggestedContact.email,
                        phone: personSuggestedContact.phone,
                        relationship: personSuggestedContact.relationship,
                        suggestedAt: convertToUnixTimestamp(personSuggestedContact.suggestedAt),
                        suggestedByUser: {
                            userId: patient.id,
                            email: patient.email,
                            firstName: patient.firstName,
                            lastName: patient.lastName,
                            phone: patient.phone,
                            avatar: patient.avatar,
                            role: patient.role,
                            roleLabel: patient.roleLabel,
                            deletedAt: patient.deletedAt,
                            passwordUpdatedAt: patient.passwordUpdatedAt,
                        },
                    },
                ],
                organizations: [
                    {
                        contactId: organizationSuggestedContact.id,
                        name: organizationSuggestedContact.name,
                        email: organizationSuggestedContact.email,
                        phone: organizationSuggestedContact.phone,
                        fax: organizationSuggestedContact.fax,
                        type: organizationSuggestedContact.type,
                        suggestedAt: convertToUnixTimestamp(organizationSuggestedContact.suggestedAt),
                        suggestedByUser: {
                            userId: patient.id,
                            email: patient.email,
                            firstName: patient.firstName,
                            lastName: patient.lastName,
                            phone: patient.phone,
                            avatar: patient.avatar,
                            role: patient.role,
                            roleLabel: patient.roleLabel,
                            deletedAt: patient.deletedAt,
                            passwordUpdatedAt: patient.passwordUpdatedAt,
                        },
                    },
                ],
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
