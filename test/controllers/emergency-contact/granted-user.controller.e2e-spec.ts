import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PersonEmergencyContact, PatientDataAccess, User} from 'domain/entities';
import {OrganizationEmergencyContact} from 'domain/entities/organization-emergency-contact.entity';
import {OrganizationTypeEnum} from 'domain/constants/emergency-contact.const';
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
    id: 'a9d9a7d9-0c0c-43a8-9ebf-bfbf4ecc1463',
    userId: patient.id,
    name: 'Marc',
    email: 'suggested@gmail.com',
    phone: '2930412345',
    fax: '2930412345',
    type: OrganizationTypeEnum.Pharmacy,
    createdAt: '2022-12-10 17:31:07.016236',
    rank: null,
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
        };
        const mockedPersonEmergencyContactRepository = {
            getByUserId: jest.fn(() => Promise.resolve([personEmergencyContact])),
        };
        const mockedOrganizationEmergencyContactRepository = {
            getByUserId: jest.fn(() => Promise.resolve([organizationEmergencyContact])),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
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
            .overrideProvider(IPatientVitalThresholdsRepository)
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
            .useValue(mockedPatientDataAccessRepository)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/emergency-contacts/:patientUserId (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/emergency-contacts/${patient.id}`)
            .set('Authorization', 'Bearer doctor')
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

    afterAll(async () => {
        await app.close();
    });
});
