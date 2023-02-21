import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientDiagnosisModule} from 'infrastructure/modules/patient-diagnosis/patient-diagnosis.module';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {PatientDataAccess, PatientDiagnosis, User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {PatientDiagnosisModel} from 'infrastructure/modules/patient-diagnosis/models';
import {DiagnosisDto} from 'domain/dtos/request/patient-diagnosis/diagnosis.dto';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';

const patient: User = {
    id: 'bd58571c-c935-41e9-9e08-a8d4e0e93f5f',
    email: 'patient@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Patient',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};
const doctor: User = {
    id: '4babe90f-b1a3-145e-c0mz-9aq248098ac0',
    email: 'doctor@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Doctor',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};
const patientDataAccess: PatientDataAccess = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'FromPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
};
const patientDiagnosis: PatientDiagnosis = {
    id: 'eee3adc4-9e36-4bb1-8911-e2161a2a3975',
    patientUserId: patient.id,
    diagnosisName: 'Diagnosis Name',
    createdBy: patient.id,
    createdAt: '2022-10-10 07:31:17.016236',
};

describe('PatientDiagnosisController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            getByIds: jest.fn(() => Promise.resolve([patient])),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
        };
        const mockedPatientDiagnosisRepository = {
            create: jest.fn(() => Promise.resolve()),
            getByPatientUserId: jest.fn(() => Promise.resolve([patientDiagnosis])),
            getOneById: jest.fn(() => Promise.resolve(patientDiagnosis)),
            delete: jest.fn(() => Promise.resolve()),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, PatientDiagnosisModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDiagnosisModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientCategoryModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(mockedPatientDataAccessRepository)
            .overrideProvider(IPatientDiagnosisRepository)
            .useValue(mockedPatientDiagnosisRepository)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IPatientCategoryRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient-diagnosis (POST)', async () => {
        const dto = new DiagnosisDto();
        dto.patientUserId = patient.id;
        dto.diagnosisName = 'Test';
        return request(app.getHttpServer())
            .post('/patient-diagnosis')
            .set('Authorization', 'Bearer patient')
            .send(dto)
            .expect(201);
    });

    it('/patient-diagnoses/:patientUserId (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/patient-diagnoses/${patient.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200)
            .expect([
                {
                    diagnosisId: patientDiagnosis.id,
                    diagnosisName: patientDiagnosis.diagnosisName,
                    createdAt: patientDiagnosis.createdAt,
                    createdByUser: {
                        userId: patient.id,
                        email: patient.email,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        phone: patient.phone,
                        avatar: 'https://zenzers-medical-dev.s3.amazonaws.com/avatars/default-avatar.png',
                        role: patient.role,
                        deletedAt: patient.deletedAt,
                    },
                },
            ]);
    });

    it('/patient-diagnosis/:diagnosisId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/patient-diagnosis/${patientDiagnosis.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(204);
    });

    afterAll(async () => {
        await app.close();
    });
});
