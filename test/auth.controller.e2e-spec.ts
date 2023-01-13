import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {IAuthModel} from 'app/modules/auth/models';
import {AuthModel} from 'infrastructure/aws/cognito/auth.model';
import {INestApplication} from '@nestjs/common';
import {CreateDoctorDto} from 'domain/dtos/request/auth';
import {AuthModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {User} from 'domain/entities';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {EventEmitterModule} from '@nestjs/event-emitter';

const authModel: IAuthModel = new AuthModel({
    UserConfirmed: true,
    UserSub: '2b9d1770-2ad2-4ac6-bb63-a7e9c1b1f815',
});

const user: User = {
    id: '2b9d1770-2ad2-4ac6-bb63-a7e9c1b1f815',
    email: 'marc@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    role: 'Doctor',
    createdAt: '2023-01-13 17:31:17.016236',
    avatar: null,
    deletedAt: null,
};

describe('AuthController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const cognitoService = {
            signUp: jest.fn(() => Promise.resolve(authModel)),
            deleteUser: jest.fn(() => Promise.resolve()),
        };
        const mailSenderService = {
            sendMail: jest.fn(() => Promise.resolve()),
        };
        const userRepository = {
            persist: jest.fn(() => Promise.resolve(user)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, EventEmitterModule.forRoot()],
        })
            .overrideProvider(IAuthService)
            .useValue(cognitoService)
            .overrideProvider(IMailSenderService)
            .useValue(mailSenderService)
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue({})
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue({})
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue({})
            .overrideProvider(IUserRepository)
            .useValue(userRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue({})
            .overrideProvider(IDoctorMetadataRepository)
            .useValue({})
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/doctor/sign-up (POST)`, () => {
        const dto = new CreateDoctorDto();
        return request(app.getHttpServer()).post('/doctor/sign-up').send(dto).expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});
