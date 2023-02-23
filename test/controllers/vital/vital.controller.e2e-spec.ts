import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {VitalModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {VitalModel} from 'infrastructure/modules/vital/models';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
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

describe('VitalController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, VitalModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientDataAccessModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(VitalModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientCategoryModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientVitalThresholdsModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(null)
            .overrideProvider(IVitalRepository)
            .useValue(null)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .overrideProvider(IPatientCategoryRepository)
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
