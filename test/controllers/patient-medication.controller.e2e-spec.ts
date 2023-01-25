import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {PatientMedicationModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {PatientDataAccess, User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {MedicationDto} from 'domain/dtos/request/patient-medication/medication.dto';
import {PatientMedicationModel} from 'infrastructure/modules/patient-medication/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';

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
describe('PatientMedicationController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
        };
        const mockedPatientMedicationRepository = {
            create: jest.fn(() => Promise.resolve()),
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
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it(`/patient-medication (POST)`, async () => {
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

    afterAll(async () => {
        await app.close();
    });
});
