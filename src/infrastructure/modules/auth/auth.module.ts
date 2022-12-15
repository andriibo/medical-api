import {Module} from '@nestjs/common';
import {AuthController} from 'controllers/auth.controller';
import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {CognitoService} from 'infrastructure/aws/cognito/cognito.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {
    UserModel,
    DoctorMetadataModel,
    PatientMetadataModel,
    UserRepository,
    DoctorMetadataRepository,
    PatientMetadataRepository,
} from './models';
import {IUserEntityMapper} from 'app/modules/auth/mappers/user-entity.mapper';
import {UserModelMapper} from './mappers/user-model.mapper';
import {AuthUseCasesFactory} from './factories/auth-use-cases.factory';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AuthedUserService} from './services/authed-user.service';
import {RequestUserService} from 'infrastructure/services/request-user.service';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';
import {AuthEventEmitter} from './event-emitters/auth.event-emitter';
import {AuthListener} from './listeners/auth.listener';
import {MailModule} from 'infrastructure/modules/mail/mail.module';
import {IDoctorMetadataRepository, IPatientMetadataRepository} from 'app/modules/profile/repositories';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel]), MailModule],
    exports: [
        IAuthService,
        IAuthedUserService,
        IUserRepository,
        IPatientMetadataRepository,
        IDoctorMetadataRepository,
        RequestUserService,
    ],
    controllers: [AuthController],
    providers: [
        AuthUseCasesFactory,
        AuthListener,
        RequestUserService,
        {
            provide: IUserRepository,
            useClass: UserRepository,
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
            provide: IAuthService,
            useClass: CognitoService,
        },
        {
            provide: IAuthedUserService,
            useClass: AuthedUserService,
        },
        {
            provide: IUserEntityMapper,
            useClass: UserModelMapper,
        },
        {
            provide: IAuthEventEmitter,
            useClass: AuthEventEmitter,
        },
    ],
})
export class AuthModule {}
