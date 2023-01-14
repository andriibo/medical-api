import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {AuthResultModel, IAuthModel, ResendConfirmationCodeResultModel} from 'app/modules/auth/models';
import {AuthModel} from 'infrastructure/aws/cognito/auth.model';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {
    AuthUserDto,
    ConfirmSignUpUserDto,
    CreateDoctorDto,
    CreatePatientDto,
    ResendSignUpCodeDto,
} from 'domain/dtos/request/auth';
import {AuthModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {User} from 'domain/entities';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {CreateCaregiverDto} from 'domain/dtos/request/auth/create-caregiver.dto';
import {currentUnixTimestamp} from 'app/support/date.helper';

const authModel: IAuthModel = new AuthModel({
    UserConfirmed: true,
    UserSub: '2b9d1770-2ad2-4ac6-bb63-a7e9c1b1f815',
});

const authResultModel = new AuthResultModel();
authResultModel.token = 'access_token';
authResultModel.tokenExpireTime = currentUnixTimestamp() + 3600;
const tokenClaims = {
    sub: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    'cognito:groups': ['Doctor'],
    exp: authResultModel.tokenExpireTime,
};
const resendConfirmationCodeResultModel: ResendConfirmationCodeResultModel = {
    destination: 'destination',
    deliveryMedium: 'deliveryMedium',
    attributeName: 'attributeName',
};
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
describe('AuthController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedCognitoService = {
            signUp: jest.fn(() => Promise.resolve(authModel)),
            signIn: jest.fn(() => Promise.resolve(authResultModel)),
            getTokenClaims: jest.fn(() => Promise.resolve(tokenClaims)),
            confirmSignUp: jest.fn(() => Promise.resolve()),
            resendConfirmSignUpCode: jest.fn(() => Promise.resolve(resendConfirmationCodeResultModel)),
            deleteUser: jest.fn(() => Promise.resolve()),
        };
        const mockedMailSenderService = {
            sendMail: jest.fn(() => Promise.resolve()),
        };
        const mockedUserRepository = {
            persist: jest.fn((user: User) => Promise.resolve(user)),
            getOneById: jest.fn(() => Promise.resolve(registeredUser)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AuthModule, EventEmitterModule.forRoot()],
        })
            .overrideProvider(IAuthService)
            .useValue(mockedCognitoService)
            .overrideProvider(IMailSenderService)
            .useValue(mockedMailSenderService)
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue({})
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it(`/sign-in (POST)`, async () => {
        const dto = new AuthUserDto();
        dto.email = 'doctor@gmail.com';
        dto.password = '123456!Aa';
        return request(app.getHttpServer())
            .post('/sign-in')
            .send(dto)
            .expect(200)
            .expect({
                token: authResultModel.token,
                tokenExpireTime: new Date(tokenClaims.exp * 1000).toISOString(),
                user: {
                    avatar: registeredUser.avatar,
                    deletedAt: registeredUser.deletedAt,
                    userId: registeredUser.id,
                    email: registeredUser.email,
                    firstName: registeredUser.firstName,
                    lastName: registeredUser.lastName,
                    phone: registeredUser.phone,
                    role: registeredUser.role,
                },
            });
    });

    it(`/doctor/sign-up (POST)`, async () => {
        const dto = new CreateDoctorDto();
        dto.email = 'doctor@gmail.com';
        dto.firstName = 'Marc';
        dto.lastName = 'Goldman';
        dto.phone = '2930412345';
        dto.password = '123456!Aa';
        return request(app.getHttpServer()).post('/doctor/sign-up').send(dto).expect(201);
    });

    it(`/patient/sign-up (POST)`, async () => {
        const dto = new CreatePatientDto();
        dto.email = 'patient@gmail.com';
        dto.firstName = 'Marc';
        dto.lastName = 'Goldman';
        dto.phone = '2930412345';
        dto.dob = new Date('1990-01-01');
        dto.gender = 'Male';
        dto.height = 180;
        dto.weight = 80;
        dto.password = '123456!Aa';
        return request(app.getHttpServer()).post('/patient/sign-up').send(dto).expect(201);
    });

    it(`/caregiver/sign-up (POST)`, async () => {
        const dto = new CreateCaregiverDto();
        dto.email = 'caregiver@gmail.com';
        dto.firstName = 'Marc';
        dto.lastName = 'Goldman';
        dto.phone = '2930412345';
        dto.password = '123456!Aa';
        return request(app.getHttpServer()).post('/caregiver/sign-up').send(dto).expect(201);
    });

    it(`/sign-up/confirm (POST)`, async () => {
        const dto = new ConfirmSignUpUserDto();
        dto.email = 'doctor@gmail.com';
        dto.code = '553339';
        return request(app.getHttpServer()).post('/sign-up/confirm').send(dto).expect(200);
    });

    it(`/sign-up/resend-code (POST)`, async () => {
        const dto = new ResendSignUpCodeDto();
        dto.email = 'doctor@gmail.com';
        return request(app.getHttpServer()).post('/sign-up/resend-code').send(dto).expect(200).expect({
            destination: resendConfirmationCodeResultModel.destination,
            deliveryMedium: resendConfirmationCodeResultModel.deliveryMedium,
            attributeName: resendConfirmationCodeResultModel.attributeName,
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
