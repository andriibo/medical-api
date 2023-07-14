import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientStatusModule} from 'infrastructure/modules/patient-status/patient-status.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {
    DoctorMetadataModel,
    PatientMetadataModel,
    UserModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {PatientDataAccess, User} from 'domain/entities';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {PatientStatus} from 'domain/entities/patient-status.entity';
import {currentUnixTimestamp} from 'support/date.helper';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientStatusEnum} from 'domain/constants/patient.const';
import {PatientStatusSpecification} from 'app/modules/patient-status/specifications/patient-status.specification';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';

const patient: User = {
    id: '3db4ddee-78b7-42d3-bb79-c38c9f5b7700',
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

const patientStatus: PatientStatus = {
    patientUserId: patient.id,
    status: PatientStatusEnum.Normal,
    setBy: patient.id,
    setAt: currentUnixTimestamp(),
};

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

const patientDataAccess: PatientDataAccess = {
    id: 'f7c5009e-dd15-41f0-a8f9-77e69aa87c99',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'FromPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    patientUser: patient,
    lastInviteSentAt: 0,
};

describe('PatientStatusController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(doctor)),
        };
        const mockedPatientStatusRepository = {
            getByPatientUserId: jest.fn(() => Promise.resolve(patientStatus)),
            persist: jest.fn(() => Promise.resolve()),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, PatientStatusModule, PatientDataAccessModule],
            providers: [
                {
                    provide: PatientStatusSpecification,
                    useFactory: (patientDataAccessSpecification: PatientDataAccessSpecification) => {
                        return new PatientStatusSpecification(patientDataAccessSpecification);
                    },
                    inject: [PatientDataAccessSpecification],
                },
            ],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(CaregiverMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(ICaregiverMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(mockedPatientStatusRepository)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(mockedPatientDataAccessRepository)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient-status/:patientUserId (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/patient-status/${patientStatus.patientUserId}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200)
            .expect({
                status: patientStatus.status,
                setAt: patientStatus.setAt,
            });
    });

    it('/patient-status/normal/:patientUserId (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/patient-status/normal/${patientStatus.patientUserId}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/patient-status/borderline/:patientUserId (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/patient-status/borderline/${patientStatus.patientUserId}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    it('/patient-status/abnormal/:patientUserId (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/patient-status/abnormal/${patientStatus.patientUserId}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
