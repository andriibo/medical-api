import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {SuggestedContactModule} from 'infrastructure/modules/suggected-contact/suggested-contact.module';
import {OrganizationSuggestedContact, PatientDataAccess, PersonSuggestedContact, User} from 'domain/entities';
import {TestModule} from 'tests/test.module';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
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
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PersonSuggestedContactDto} from 'domain/dtos/request/suggested-contact/person-suggested-contact.dto';
import {OrganizationSuggestedContactDto} from 'domain/dtos/request/suggested-contact/organization-suggested-contact.dto';
import {convertToUnixTimestamp} from 'support/date.helper';
import {OrganizationType} from 'domain/entities/organization-emergency-contact.entity';

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

const personSuggestedContact: PersonSuggestedContact = {
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

const organizationSuggestedContact: OrganizationSuggestedContact = {
    id: 'a9d9a7d9-0c0c-43a8-9ebf-bfbf4ecc1464',
    patientUserId: patient.id,
    name: 'Marc',
    email: 'suggested@gmail.com',
    phone: '2930412345',
    fax: '2930412345',
    type: OrganizationType.Pharmacy,
    suggestedAt: '2022-12-10 17:31:07.016236',
    suggestedBy: doctor.id,
};

const patientDataAccess: PatientDataAccess = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'FromPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    lastInviteSentAt: 0,
};

describe('GrantedUserController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(doctor)),
            getByIds: jest.fn(() => Promise.resolve([doctor])),
        };
        const mockedPersonSuggestedContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(personSuggestedContact)),
            getByPatientUserIdAndSuggestedBy: jest.fn(() => Promise.resolve([personSuggestedContact])),
            create: jest.fn(() => Promise.resolve()),
            delete: jest.fn(() => Promise.resolve()),
        };
        const mockedOrganizationSuggestedContactRepository = {
            getOneById: jest.fn(() => Promise.resolve(organizationSuggestedContact)),
            getByPatientUserIdAndSuggestedBy: jest.fn(() => Promise.resolve([organizationSuggestedContact])),
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
            .useValue(null)
            .overrideProvider(IOrganizationEmergencyContactRepository)
            .useValue(null)
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
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(mockedPatientDataAccessRepository)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/person-suggested-contact (POST)', async () => {
        const dto: PersonSuggestedContactDto = {
            patientUserId: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
            firstName: 'Marc',
            lastName: 'Goldman',
            email: 'suggested@gmail.com',
            phone: '2930412345',
            relationship: 'MedicalProfessional',
        };
        return request(app.getHttpServer())
            .post('/person-suggested-contact')
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(201);
    });

    it('/organization-suggested-contact (POST)', async () => {
        const dto: OrganizationSuggestedContactDto = {
            patientUserId: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
            name: 'Goldman',
            email: 'suggested@gmail.com',
            phone: '2930412345',
            fax: '2930412345',
            type: OrganizationType.Pharmacy,
        };
        return request(app.getHttpServer())
            .post('/organization-suggested-contact')
            .send(dto)
            .set('Authorization', 'Bearer doctor')
            .expect(201);
    });

    it('/person-suggested-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/person-suggested-contact/${personSuggestedContact.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(204);
    });

    it('/organization-suggested-contact/:contactId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/organization-suggested-contact/${organizationSuggestedContact.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(204);
    });

    it('/suggested-contacts/:patientUserId (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/suggested-contacts/${patient.id}`)
            .set('Authorization', 'Bearer doctor')
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
                    },
                ],
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
