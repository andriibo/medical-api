import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {ProfileModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {PatientMetadata, PatientDataAccess, User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {TestModule} from 'tests/test.module';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {IVitalRepository} from 'app/modules/vitals/repositories';
import {VitalModel} from 'infrastructure/modules/vitals/models';
import {PatientRelationshipModel} from 'infrastructure/modules/patient-relationship/models';
import {PatientRelationship} from 'domain/entities/patient-relationship.entity';
import {IPatientRelationshipRepository} from 'app/modules/patient-relationship/repositories';

const caregiver: User = {
    id: '4babe90f-b1a3-145e-c0mz-9aq248098ac0',
    email: 'caregiver@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Caregiver',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};

const patient: User = {
    id: '862108e8-32f6-4d37-840e-2db213f0c2fe',
    email: 'patient@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Patient',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};

const patientMetadata: PatientMetadata = {
    userId: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0',
    dob: new Date(currentUnixTimestamp()),
    gender: 'Male',
    height: 180,
    weight: 80,
    user: patient,
};
patient.patientMetadata = patientMetadata;

const users = {
    [caregiver.id]: caregiver,
    [patient.id]: patient,
};

const patientDataAccess: PatientDataAccess = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: caregiver.id,
    direction: 'FromPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
};
const patientRelationship: PatientRelationship = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: caregiver.id,
    direction: 'FromPatient',
    status: 'Approved',
    patientCategory: 'Normal',
    patientCategoryUpdatedAt: currentUnixTimestamp(),
    createdAt: new Date().toISOString(),
    patientUser: patient,
};

const usersLastConnectionTime = [{userId: '5nc3e70a-c1y9-121a-c5mv-5aq272098bp0', timestamp: currentUnixTimestamp()}];

describe('GrantedUserController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedRemoveDoctorService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedRemoveCaregiverOrPatientService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedUserRepository = {
            getOneById: jest.fn((userId: string) => Promise.resolve(users[userId])),
        };
        const mockedPatientMetadataRepository = {
            getOneById: jest.fn(() => Promise.resolve(patientMetadata)),
        };
        const mockedVitalRepository = {
            getLastConnectionTimeByUserIds: jest.fn(() => Promise.resolve(usersLastConnectionTime)),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
        };
        const mockedPatientRelationshipRepository = {
            getByGrantedUserIdAndStatus: jest.fn(() => Promise.resolve([patientRelationship])),
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
            .overrideProvider(getRepositoryToken(PatientRelationshipModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(VitalModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(mockedPatientMetadataRepository)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(mockedPatientDataAccessRepository)
            .overrideProvider(IPatientRelationshipRepository)
            .useValue(mockedPatientRelationshipRepository)
            .overrideProvider(IVitalRepository)
            .useValue(mockedVitalRepository)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it(`/profile/my-patients (GET)`, async () => {
        return request(app.getHttpServer())
            .get('/profile/my-patients')
            .set('Authorization', 'Bearer caregiver')
            .expect(200)
            .expect([
                {
                    userId: patient.id,
                    email: patient.email,
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    phone: patient.phone,
                    dob: patientMetadata.dob.toISOString(),
                    height: patientMetadata.height,
                    weight: patientMetadata.weight,
                    gender: patientMetadata.gender,
                    avatar: 'https://zenzers-medical-dev.s3.amazonaws.com/avatars/default-avatar.png',
                    deletedAt: null,
                    accessId: patientRelationship.id,
                    lastConnected: null,
                    category: patientRelationship.patientCategory,
                },
            ]);
    });

    it(`/patient-profile/{patientUserId} (GET)`, async () => {
        return request(app.getHttpServer())
            .get(`/patient-profile/${patient.id}`)
            .set('Authorization', 'Bearer caregiver')
            .expect(200)
            .expect({
                userId: patient.id,
                email: patient.email,
                firstName: patient.firstName,
                lastName: patient.lastName,
                phone: patient.phone,
                dob: patientMetadata.dob.toISOString(),
                height: patientMetadata.height,
                weight: patientMetadata.weight,
                gender: patientMetadata.gender,
                avatar: 'https://zenzers-medical-dev.s3.amazonaws.com/avatars/default-avatar.png',
                deletedAt: null,
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
