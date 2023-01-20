import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {DiagnosisModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {TestModule} from 'tests/test.module';
import {DiagnosisModel} from 'infrastructure/modules/diagnosis/models/diagnosis.model';
import {IDiagnosisRepository} from 'app/modules/diagnosis/repositories';

const registeredUser: User = {
    id: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    email: 'doctor@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Doctor',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
};
const diagnoses = [
    {
        diagnosisName: "Alzheimer's Disease",
    },
];
describe('DiagnosisController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(registeredUser)),
        };
        const mockedDiagnosisRepository = {
            get: jest.fn(() => Promise.resolve(diagnoses)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, DiagnosisModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DiagnosisModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(IDiagnosisRepository)
            .useValue(mockedDiagnosisRepository)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it(`/diagnoses (GET)`, async () => {
        return request(app.getHttpServer())
            .get('/diagnoses')
            .set('Authorization', 'Bearer doctor')
            .expect(200)
            .expect(diagnoses);
    });

    afterAll(async () => {
        await app.close();
    });
});
