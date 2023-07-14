import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {VitalModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {
    DoctorMetadataModel,
    PatientMetadataModel,
    UserModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {VitalModel} from 'infrastructure/modules/vital/models';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {
    AbsMaxDBP,
    AbsMaxHR,
    AbsMaxRR,
    AbsMaxSBP,
    AbsMaxSpO2,
    AbsMaxTemp,
    AbsMinDBP,
    AbsMinHR,
    AbsMinRR,
    AbsMinSBP,
    AbsMinSpO2,
    AbsMinTemp,
} from 'domain/constants/vitals.const';
import {PatientVitalThresholdsModel} from 'infrastructure/modules/patient-vital-thresholds/models';
import {User} from 'domain/entities';

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

describe('VitalController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, VitalModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(CaregiverMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(VitalModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientVitalThresholdsModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IVitalRepository)
            .useValue(null)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(ICaregiverMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/vitals/absolute (GET)', async () => {
        return request(app.getHttpServer())
            .get('/vitals/absolute')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect({
                minHr: AbsMinHR,
                maxHr: AbsMaxHR,
                minTemp: AbsMinTemp,
                maxTemp: AbsMaxTemp,
                minSpo2: AbsMinSpO2,
                maxSpo2: AbsMaxSpO2,
                minRr: AbsMinRR,
                maxRr: AbsMaxRR,
                minDbp: AbsMinDBP,
                maxDbp: AbsMaxDBP,
                minSbp: AbsMinSBP,
                maxSbp: AbsMaxSBP,
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
