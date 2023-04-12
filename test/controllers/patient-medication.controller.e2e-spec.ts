import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientMedicationModule} from 'infrastructure/modules/patient-medication/patient-medication.module';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {PatientDataAccess, PatientMedication, User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {MedicationDto} from 'domain/dtos/request/patient-medication/medication.dto';
import {PatientMedicationModel} from 'infrastructure/modules/patient-medication/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {convertToUnixTimestamp} from 'app/support/date.helper';

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
    passwordUpdatedAt: '2022-11-12 17:01:27.012109',
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
    passwordUpdatedAt: '2022-11-12 17:01:27.012109',
};
const patientDataAccess: PatientDataAccess = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'FromPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
};
const patientMedication: PatientMedication = {
    id: 'eee3adc4-9e36-4bb1-8911-e2161a2a3975',
    patientUserId: patient.id,
    genericName: 'Generic Name',
    brandNames: ['One', 'Two'],
    createdBy: patient.id,
    createdAt: '2022-10-10 07:31:17.016236',
};
describe('PatientMedicationController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            getByIds: jest.fn(() => Promise.resolve([patient])),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
        };
        const mockedPatientMedicationRepository = {
            create: jest.fn(() => Promise.resolve()),
            getOneById: jest.fn(() => Promise.resolve(patientMedication)),
            getByPatientUserId: jest.fn(() => Promise.resolve([patientMedication])),
            delete: jest.fn(() => Promise.resolve()),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, PatientMedicationModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMedicationModel))
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
            .overrideProvider(IPatientMedicationRepository)
            .useValue(mockedPatientMedicationRepository)
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

    it('/patient-medication (POST)', async () => {
        const dto = new MedicationDto();
        dto.patientUserId = patient.id;
        dto.genericName = 'Test';
        dto.brandNames = ['One', 'Two'];
        return request(app.getHttpServer())
            .post('/patient-medication')
            .set('Authorization', 'Bearer patient')
            .send(dto)
            .expect(201);
    });

    it('/patient-medications/:patientUserId (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/patient-medications/${patient.id}`)
            .set('Authorization', 'Bearer doctor')
            .expect(200)
            .expect([
                {
                    genericName: patientMedication.genericName,
                    brandNames: patientMedication.brandNames,
                    medicationId: patientMedication.id,
                    createdAt: patientMedication.createdAt,
                    createdByUser: {
                        userId: patient.id,
                        email: patient.email,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        phone: patient.phone,
                        avatar: patient.avatar,
                        role: patient.role,
                        deletedAt: patient.deletedAt,
                        passwordUpdatedAt: convertToUnixTimestamp(patient.passwordUpdatedAt),
                    },
                },
            ]);
    });

    it('/patient-medication/:medicationId (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/patient-medication/${patientMedication.id}`)
            .set('Authorization', 'Bearer patient')
            .expect(204);
    });

    afterAll(async () => {
        await app.close();
    });
});
