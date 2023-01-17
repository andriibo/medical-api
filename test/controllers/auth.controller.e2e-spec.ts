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
import {AuthModule} from 'infrastructure/modules';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {DoctorMetadataModel, PatientMetadataModel, UserModel} from 'infrastructure/modules/auth/models';
import {User} from 'domain/entities';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';
import {CreateCaregiverDto} from 'domain/dtos/request/auth/create-caregiver.dto';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {TestModule} from 'tests/test.module';

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
        const mockedUserRepository = {
            persist: jest.fn((user: User) => Promise.resolve(user)),
            getOneById: jest.fn(() => Promise.resolve(registeredUser)),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, AuthModule],
        })
            .overrideProvider(getRepositoryToken(UserModel))
            .useValue(null)
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
                token: 'access_token',
                tokenExpireTime: new Date(currentUnixTimestamp() + 3600 * 1000).toISOString(),
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
            destination: 'destination',
            deliveryMedium: 'deliveryMedium',
            attributeName: 'attributeName',
        });
    });

    it(`/forgot-password (POST)`, async () => {
        const dto = new ForgotPasswordDto();
        dto.email = 'doctor@gmail.com';
        return request(app.getHttpServer()).post('/forgot-password').send(dto).expect(200).expect({
            destination: 'destination',
            deliveryMedium: 'deliveryMedium',
            attributeName: 'attributeName',
        });
    });

    it(`/forgot-password/confirm (POST)`, async () => {
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
