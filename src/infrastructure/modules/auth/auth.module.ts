import {Module} from '@nestjs/common';
import {AuthController} from 'controllers/auth.controller';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {CognitoService} from 'infrastructure/aws/cognito/cognito.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from './models';
import {AuthUseCasesFactory} from './factories/auth-use-cases.factory';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {AuthedUserService} from './services/authed-user.service';
import {RequestUserService} from 'infrastructure/services/request-user.service';
import {IAuthEventEmitter} from 'app/modules/auth/event-emitters/auth.event-emitter';
import {AuthEventEmitter} from './event-emitters/auth.event-emitter';
import {AuthListener} from './listeners/auth.listener';
import {MailModule} from 'infrastructure/modules/mail/mail.module';
import {PatientVitalThresholdsIndependentModule} from 'infrastructure/modules/patient-vital-thresholds/patient-vital-thresholds.ind.module';
import {FileModule} from 'infrastructure/modules/file/file.module';
import {UserModule} from './user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel]),
        MailModule,
        FileModule,
        PatientVitalThresholdsIndependentModule,
        UserModule,
    ],
    exports: [IAuthService, IAuthedUserService, RequestUserService],
    controllers: [AuthController],
    providers: [
        AuthUseCasesFactory,
        AuthListener,
        RequestUserService,
        {
            provide: IAuthService,
            useClass: CognitoService,
        },
        {
            provide: IAuthedUserService,
            useClass: AuthedUserService,
        },
        {
            provide: IAuthEventEmitter,
            useClass: AuthEventEmitter,
        },
    ],
})
export class AuthModule {}
