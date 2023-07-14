import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {ProfileModule} from 'infrastructure/modules/profile/profile.module';
import {IUserRepository} from 'app/modules/auth/repositories';
import {getRepositoryToken} from '@nestjs/typeorm';
import {
    DoctorMetadataModel,
    PatientMetadataModel,
    UserModel,
    CaregiverMetadataModel,
} from 'infrastructure/modules/auth/models';
import {CaregiverMetadata, DoctorMetadata, PatientDataAccess, PatientMetadata, User} from 'domain/entities';
import {
    IDoctorMetadataRepository,
    IPatientMetadataRepository,
    ICaregiverMetadataRepository,
} from 'app/modules/profile/repositories';
import {PatientDataAccessModel} from 'infrastructure/modules/patient-data-access/models';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {TestModule} from 'tests/test.module';
import {currentUnixTimestamp} from 'support/date.helper';
import {UpdatePatientProfileDto} from 'domain/dtos/request/profile';
import {VitalModel} from 'infrastructure/modules/vital/models';
import {IVitalRepository} from 'app/modules/vital/repositories';
import {PatientStatusModel} from 'infrastructure/modules/patient-status/models';
import {IPatientStatusRepository} from 'app/modules/patient-status/repositories';
import {IPatientVitalThresholdsRepository} from 'app/modules/patient-vital-thresholds/repositories';
import {IRemoveMyAvatarService} from 'app/modules/profile/services/remove-my-avatar.service';

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

const doctor: User = {
    id: '1nc5e10o-b1w9-239h-c7mk-9af242088lw0',
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

const caregiver: User = {
    id: '2rc8q18o-c1v2-199c-c8ma-9cf142780lb0',
    email: 'caregiver@gmail.com',
    firstName: 'Marc',
    lastName: 'Goldman',
    phone: '2930412345',
    avatar: null,
    role: 'Caregiver',
    roleLabel: 'CaregiverProfessional',
    createdAt: '2022-10-10 07:31:17.016236',
    deletedAt: null,
    passwordUpdatedAt: 1681305134,
};

const patientMetadata: PatientMetadata = {
    userId: patient.id,
    dob: new Date(currentUnixTimestamp()),
    gender: 'Male',
    height: 180,
    weight: 84,
    user: patient,
};

const doctorMetadata: DoctorMetadata = {
    userId: doctor.id,
    institution: 'institution',
    specialty: 'specialty',
    user: doctor,
};
doctor.doctorMetadata = doctorMetadata;

const caregiverMetadata: CaregiverMetadata = {
    userId: caregiver.id,
    institution: 'institution',
    user: caregiver,
};
caregiver.caregiverMetadata = caregiverMetadata;

const patientDataAccessForDoctor: PatientDataAccess = {
    id: '18c3v71a-a0y2-928e-c1mx-1aq202018lp2',
    patientUserId: patient.id,
    grantedUserId: doctor.id,
    direction: 'ToPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    grantedUser: doctor,
    lastInviteSentAt: 0,
};

const patientDataAccessForCaregiver: PatientDataAccess = {
    id: '17c3e70s-b0w2-126s-c8mo-1cq901092qm9',
    patientUserId: patient.id,
    grantedUserId: caregiver.id,
    direction: 'ToPatient',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    grantedUser: caregiver,
    lastInviteSentAt: 0,
};
describe('PatientController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const mockedRemoveDoctorService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedRemoveCaregiverOrPatientService = {
            remove: jest.fn(() => Promise.resolve()),
        };
        const mockedUserRepository = {
            getOneById: jest.fn(() => Promise.resolve(patient)),
            persist: jest.fn((user: User) => Promise.resolve(user)),
        };
        const mockedPatientMetadataRepository = {
            getOneById: jest.fn(() => Promise.resolve(patientMetadata)),
        };
        const mockedPatientDataAccessRepository = {
            getDoctorsByPatientUserIdAndStatus: jest.fn(() => Promise.resolve([patientDataAccessForDoctor])),
            getCaregiversByPatientUserIdAndStatus: jest.fn(() => Promise.resolve([patientDataAccessForCaregiver])),
        };
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [TestModule, ProfileModule],
        })
            .overrideProvider('RemoveDoctorService')
            .useValue(mockedRemoveDoctorService)
            .overrideProvider('RemoveCaregiverOrPatientService')
            .useValue(mockedRemoveCaregiverOrPatientService)
            .overrideProvider(IRemoveMyAvatarService)
            .useValue(null)
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
            .overrideProvider(getRepositoryToken(PatientStatusModel))
            .useValue(null)
            .overrideProvider(getRepositoryToken(VitalModel))
            .useValue(null)
            .overrideProvider(IUserRepository)
            .useValue(mockedUserRepository)
            .overrideProvider(IPatientMetadataRepository)
            .useValue(mockedPatientMetadataRepository)
            .overrideProvider(IDoctorMetadataRepository)
            .useValue(null)
            .overrideProvider(ICaregiverMetadataRepository)
            .useValue(null)
            .overrideProvider(IPatientDataAccessRepository)
            .useValue(mockedPatientDataAccessRepository)
            .overrideProvider(IPatientStatusRepository)
            .useValue(null)
            .overrideProvider(IVitalRepository)
            .useValue(null)
            .overrideProvider(IPatientVitalThresholdsRepository)
            .useValue(null)
            .compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    it('/patient/my-profile (GET)', async () => {
        return request(app.getHttpServer())
            .get('/patient/my-profile')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect({
                userId: patient.id,
                email: patient.email,
                firstName: patient.firstName,
                lastName: patient.lastName,
                phone: patient.phone,
                role: patient.role,
                roleLabel: patient.roleLabel,
                dob: patientMetadata.dob.toISOString(),
                gender: patientMetadata.gender,
                height: patientMetadata.height,
                weight: patientMetadata.weight,
                avatar: patient.avatar,
                deletedAt: null,
                passwordUpdatedAt: patient.passwordUpdatedAt,
            });
    });

    it('/patient/my-profile (PATCH)', async () => {
        const dto = new UpdatePatientProfileDto();
        dto.firstName = 'Test';
        dto.lastName = 'Test';
        dto.phone = '123456789';
        dto.dob = new Date('1990-01-01');
        dto.gender = 'Female';
        dto.height = 167;
        dto.weight = 54;
        return request(app.getHttpServer())
            .patch('/patient/my-profile')
            .send(dto)
            .set('Authorization', 'Bearer patient')
            .expect(200);
    });

    it('/patient/my-doctors (GET)', async () => {
        return request(app.getHttpServer())
            .get('/patient/my-doctors')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect([
                {
                    userId: doctor.id,
                    email: doctor.email,
                    firstName: doctor.firstName,
                    lastName: doctor.lastName,
                    phone: doctor.phone,
                    role: doctor.role,
                    roleLabel: doctor.roleLabel,
                    institution: doctorMetadata.institution,
                    specialty: doctorMetadata.specialty,
                    avatar: doctor.avatar,
                    deletedAt: null,
                    accessId: patientDataAccessForDoctor.id,
                    passwordUpdatedAt: doctor.passwordUpdatedAt,
                },
            ]);
    });

    it('/patient/my-caregivers (GET)', async () => {
        return request(app.getHttpServer())
            .get('/patient/my-caregivers')
            .set('Authorization', 'Bearer patient')
            .expect(200)
            .expect([
                {
                    userId: caregiver.id,
                    email: caregiver.email,
                    firstName: caregiver.firstName,
                    lastName: caregiver.lastName,
                    phone: caregiver.phone,
                    role: caregiver.role,
                    roleLabel: caregiver.roleLabel,
                    institution: caregiverMetadata.institution,
                    avatar: caregiver.avatar,
                    deletedAt: null,
                    accessId: patientDataAccessForCaregiver.id,
                    passwordUpdatedAt: caregiver.passwordUpdatedAt,
                },
            ]);
    });

    afterAll(async () => {
        await app.close();
    });
});
