import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {VitalModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {TestModule} from 'tests/test.module';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {VitalModel} from 'infrastructure/modules/vital/models';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientCategoryRepository} from 'app/modules/patient-category/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {PatientDataAccess, PatientVitalThresholds, User, Vital} from 'domain/entities';
import {convertToUnixTimestamp, currentUnixTimestamp} from 'support/date.helper';
import {PatientVitalThresholdsModel} from 'infrastructure/modules/patient-vital-thresholds/models';

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
const doctor: User = {
    id: '4babe90f-b1a3-145e-c0mz-9aq248098ac0',
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
const patientVitalThresholds: PatientVitalThresholds = {
    id: 'af095ce6-97d8-4a49-85c3-03ba5050bfa4',
    patientUserId: patient.id,
    minHr: 40,
    maxHr: 220,
    hrSetBy: null,
    hrSetAt: null,
    minTemp: 32,
    maxTemp: 42,
    tempSetBy: null,
    tempSetAt: null,
    minSpo2: 40,
    spo2SetBy: null,
    spo2SetAt: null,
    minRr: 4,
    maxRr: 60,
    rrSetBy: null,
    rrSetAt: null,
    minDbp: 30,
    maxDbp: 130,
    dbpSetBy: null,
    dbpSetAt: null,
    minSbp: 70,
    maxSbp: 220,
    sbpSetBy: null,
    sbpSetAt: null,
    minMap: 43,
    maxMap: 160,
    mapSetBy: null,
    mapSetAt: null,
    createdAt: new Date().toISOString(),
};
const vital: Vital = {
    id: 'ebf9b75d-fde9-49c0-a4e6-c1df2f8b4ff7',
    userId: patient.id,
    temp: 38,
    isTempNormal: true,
    hr: 170,
    isHrNormal: true,
    spo2: 50,
    isSpo2Normal: true,
    rr: 30,
    isRrNormal: true,
    fall: true,
    timestamp: currentUnixTimestamp(),
    thresholdsId: patientVitalThresholds.id,
    user: patient,
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
        const mockedVitalRepository = {
            getByUserIdForInterval: jest.fn(() => Promise.resolve([vital])),
        };
        const mockedPatientVitalThresholdsRepository = {
            getByIds: jest.fn(() => Promise.resolve([patientVitalThresholds])),
        };
        const mockedPatientDataAccessRepository = {
            getOneByPatientUserIdAndGrantedUserId: jest.fn(() => Promise.resolve(patientDataAccess)),
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
            .useValue(mockedUserRepository)
            .overrideProvider(IVitalRepository)
            .useValue(mockedVitalRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(mockedPatientVitalThresholdsRepository)
            .overrideProvider(IPatientCategoryRepository)
            .useValue(null)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(mockedPatientDataAccessRepository)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient-vitals/:patientUserId (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/patient-vitals/${patient.id}`)
            .query({
                startDate: '2022-07-21',
                endDate: '2023-02-04',
            })
            .set('Authorization', 'Bearer doctor')
            .expect(200)
            .expect({
                vitals: [
                    {
                        vitalId: vital.id,
                        temp: vital.temp,
                        isTempNormal: vital.isTempNormal,
                        hr: vital.hr,
                        isHrNormal: vital.isHrNormal,
                        spo2: vital.spo2,
                        isSpo2Normal: vital.isSpo2Normal,
                        rr: vital.rr,
                        isRrNormal: vital.isRrNormal,
                        fall: vital.fall,
                        timestamp: vital.timestamp,
                        thresholdsId: vital.thresholdsId,
                    },
                ],
                thresholds: [
                    {
                        isPending: false,
                        thresholdsId: patientVitalThresholds.id,
                        minHr: patientVitalThresholds.minHr,
                        maxHr: patientVitalThresholds.maxHr,
                        hrSetBy: patientVitalThresholds.hrSetBy,
                        hrSetAt: patientVitalThresholds.hrSetAt,
                        minTemp: patientVitalThresholds.minTemp,
                        maxTemp: patientVitalThresholds.maxTemp,
                        tempSetBy: patientVitalThresholds.tempSetBy,
                        tempSetAt: patientVitalThresholds.tempSetAt,
                        minSpo2: patientVitalThresholds.minSpo2,
                        spo2SetBy: patientVitalThresholds.spo2SetBy,
                        spo2SetAt: patientVitalThresholds.spo2SetAt,
                        minRr: patientVitalThresholds.minRr,
                        maxRr: patientVitalThresholds.maxRr,
                        rrSetBy: patientVitalThresholds.rrSetBy,
                        rrSetAt: patientVitalThresholds.rrSetAt,
                        minDbp: patientVitalThresholds.minDbp,
                        maxDbp: patientVitalThresholds.maxDbp,
                        dbpSetBy: patientVitalThresholds.dbpSetBy,
                        dbpSetAt: patientVitalThresholds.dbpSetAt,
                        minSbp: patientVitalThresholds.minSbp,
                        maxSbp: patientVitalThresholds.maxSbp,
                        sbpSetBy: patientVitalThresholds.sbpSetBy,
                        sbpSetAt: patientVitalThresholds.sbpSetAt,
                        minMap: patientVitalThresholds.minMap,
                        maxMap: patientVitalThresholds.maxMap,
                        mapSetBy: patientVitalThresholds.mapSetBy,
                        mapSetAt: patientVitalThresholds.mapSetAt,
                        createdAt: convertToUnixTimestamp(patientVitalThresholds.createdAt),
                    },
                ],
                users: [
                    {
                        avatar: doctor.avatar,
                        deletedAt: doctor.deletedAt,
                        userId: doctor.id,
                        email: doctor.email,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                        phone: doctor.phone,
                        role: doctor.role,
                        roleLabel: doctor.roleLabel,
                        passwordUpdatedAt: doctor.passwordUpdatedAt,
                    },
                ],
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
