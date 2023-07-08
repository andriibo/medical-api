import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {
    AuthUserDto,
    ConfirmForgotPasswordDto,
    ConfirmSignUpUserDto,
    CreateDoctorDto,
    CreatePatientDto,
    ForgotPasswordDto,
    ResendSignUpCodeDto,
} from 'domain/dtos/request/auth';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {
    DoctorMetadataModel,
    PatientMetadataModel,
    UserModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {User} from 'domain/entities';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';
import {CreateCaregiverDto} from 'domain/dtos/request/auth/create-caregiver.dto';
import {currentUnixTimestamp} from 'support/date.helper';
import {TestModule} from 'tests/test.module';
import {AuthResultModel, IAuthModel} from 'app/modules/auth/models';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {IMailSender} from 'app/modules/mail/services/abstract/mail-sender';
import {AuthModel} from 'infrastructure/aws/cognito/auth.model';
import {PatientCategoryModel} from 'infrastructure/modules/patient-category/models';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {ConfirmEmailResentDto, ForgotPasswordMailSentDto} from 'domain/dtos/response/auth';

const authModel: IAuthModel = new AuthModel({
    UserConfirmed: true,
    UserSub: '2b9d1770-2ad2-4ac6-bb63-a7e9c1b1f815',
});
const authResultModel: AuthResultModel = {
    accessToken: 'access_token',
    accessTokenExpireTime: currentUnixTimestamp() + 3600,
    refreshToken: 'refresh_token',
};
const accessTokenClaims = {
    sub: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    'cognito:groups': ['Doctor'],
    exp: authResultModel.accessTokenExpireTime,
};
const confirmEmailResentDto: ConfirmEmailResentDto = {
    destination: 'destination',
    deliveryMedium: 'deliveryMedium',
    attributeName: 'attributeName',
};
const forgotPasswordMailSentDto: ForgotPasswordMailSentDto = {
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
    roleLabel: 'Doctor',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
    passwordUpdatedAt: 1681305134,
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

const users = {
    'doctor@gmail.com': doctor,
    'not-existing-email@mail.com': null,
};

describe('AuthController', () => {
    let app: INestApplication;
    const mockedCognitoService = {
        signUp: jest.fn(() => Promise.resolve(authModel)),
        signIn: jest.fn(() => Promise.resolve(authResultModel)),
        getAccessTokenClaimsByAccessToken: jest.fn(() => Promise.resolve(accessTokenClaims)),
        confirmSignUp: jest.fn(() => Promise.resolve()),
        resendConfirmSignUpCode: jest.fn(() => Promise.resolve(confirmEmailResentDto)),
        forgotPassword: jest.fn(() => Promise.resolve(forgotPasswordMailSentDto)),
        confirmForgotPassword: jest.fn(() => Promise.resolve()),
        deleteUser: jest.fn(() => Promise.resolve()),
    };
    const mockedMailSenderService = {
        sendMail: jest.fn(() => Promise.resolve()),
    };
    beforeAll(async () => {
        const mockedUserRepository = {
            insertPatient: jest.fn((user: User) => Promise.resolve(user)),
            persist: jest.fn((user: User) => Promise.resolve(user)),
            getOneById: jest.fn(() => Promise.resolve(registeredUser)),
            getOneByEmail: jest.fn((email: string) => Promise.resolve(users[email])),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, AuthModule],
        })
            .overrideProvider(IAuthService)
            .useValue(mockedCognitoService)
            .overrideProvider(IMailSender)
            .useValue(mockedMailSenderService)
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(DoctorMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(CaregiverMetadataModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(PatientCategoryModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(null)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(ICaregiverMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/sign-in (POST)', async () => {
        const dto: AuthUserDto = {
            email: 'doctor@gmail.com',
            password: '123456!Aa',
            rememberMe: true,
        };
        return request(app.getHttpServer())
            .post('/sign-in')
            .send(dto)
            .expect(200)
            .expect({
                accessToken: authResultModel.accessToken,
                accessTokenExpireTime: new Date(authResultModel.accessTokenExpireTime * 1000).toISOString(),
                refreshToken: authResultModel.refreshToken,
                user: {
                    avatar: registeredUser.avatar,
                    deletedAt: registeredUser.deletedAt,
                    userId: registeredUser.id,
                    email: registeredUser.email,
                    firstName: registeredUser.firstName,
                    lastName: registeredUser.lastName,
                    phone: registeredUser.phone,
                    role: registeredUser.role,
                    roleLabel: registeredUser.roleLabel,
                    passwordUpdatedAt: registeredUser.passwordUpdatedAt,
                },
            });
    });

    it('/doctor/sign-up (POST)', async () => {
        const dto = new CreateDoctorDto();
        dto.email = 'doctor@gmail.com';
        dto.firstName = 'Marc';
        dto.lastName = 'Goldman';
        dto.phone = '2930412345';
        dto.password = '123456!Aa';
        dto.roleLabel = 'Doctor';
        return request(app.getHttpServer()).post('/doctor/sign-up').send(dto).expect(201);
    });

    it('/patient/sign-up (POST)', async () => {
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
        dto.roleLabel = 'Patient';
        return request(app.getHttpServer()).post('/patient/sign-up').send(dto).expect(201);
    });

    it('/caregiver/sign-up (POST)', async () => {
        const dto = new CreateCaregiverDto();
        dto.email = 'caregiver@gmail.com';
        dto.firstName = 'Marc';
        dto.lastName = 'Goldman';
        dto.phone = '2930412345';
        dto.password = '123456!Aa';
        dto.roleLabel = 'CaregiverProfessional';
        return request(app.getHttpServer()).post('/caregiver/sign-up').send(dto).expect(201);
    });

    it('/sign-up/confirm (POST)', async () => {
        const dto = new ConfirmSignUpUserDto();
        dto.email = 'doctor@gmail.com';
        dto.code = '553339';
        return request(app.getHttpServer()).post('/sign-up/confirm').send(dto).expect(200);
    });

    it(`/sign-up/resend-code (POST)`, async () => {
        const dto = new ResendSignUpCodeDto();
        dto.email = 'doctor@gmail.com';
        return request(app.getHttpServer()).post('/sign-up/resend-code').send(dto).expect(200).expect({
            destination: confirmEmailResentDto.destination,
            deliveryMedium: confirmEmailResentDto.deliveryMedium,
            attributeName: confirmEmailResentDto.attributeName,
        });
    });

    it('/forgot-password (POST): returns the not found error if email does not exist.', async () => {
        const dto = new ForgotPasswordDto();
        dto.email = 'not-existing-email@mail.com';

        return request(app.getHttpServer()).post('/forgot-password').send(dto).expect(404);
    });

    it('/forgot-password (POST)', async () => {
        const dto = new ForgotPasswordDto();
        dto.email = 'doctor@gmail.com';
        return request(app.getHttpServer()).post('/forgot-password').send(dto).expect(200).expect({
            destination: forgotPasswordMailSentDto.destination,
            deliveryMedium: forgotPasswordMailSentDto.deliveryMedium,
            attributeName: forgotPasswordMailSentDto.attributeName,
        });
    });

    it('/forgot-password/confirm (POST)', async () => {
        const dto = new ConfirmForgotPasswordDto();
        dto.email = 'doctor@gmail.com';
        dto.code = '216493';
        dto.newPassword = '21649303B@a';
        return request(app.getHttpServer()).post('/forgot-password/confirm').send(dto).expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
