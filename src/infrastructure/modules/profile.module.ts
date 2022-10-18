import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/profile';
import {IUserRepository, IPatientMetadataRepository, IDoctorMetadataRepository} from 'app/repositories';
import {UserRepository, PatientMetadataRepository, DoctorMetadataRepository} from 'infrastructure/repositories';
import {IAuthService} from 'app/services/auth.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'infrastructure/models';
import {DoctorUseCasesFactory, PatientUseCasesFactory} from 'infrastructure/factories/profile';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';
import {IUserProfileMapper} from 'app/mappers/user-profile.mapper';
import {UserProfileMapper} from 'infrastructure/mappers/user-profile.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel])],
    controllers: [PatientController, DoctorController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IAuthService,
            useClass: CognitoService,
        },
        {
            provide: IAuthedUserService,
            useClass: AuthedUserService,
        },
        {
            provide: IPatientMetadataRepository,
            useClass: PatientMetadataRepository,
        },
        {
            provide: IDoctorMetadataRepository,
            useClass: DoctorMetadataRepository,
        },
        {
            provide: IUserProfileMapper,
            useClass: UserProfileMapper,
        },
    ],
})
export class ProfileModule {}
