import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AssignUserMiddleware} from 'presentation/middlewares/assign-user.middleware';
import {RequestUserService} from 'infrastructure/services/request-user.service';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ConfigModule} from '@nestjs/config';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {
    AuthResultModel,
    ForgotPasswordResponseModel,
    IAuthModel,
    ResendConfirmationCodeResultModel,
} from 'app/modules/auth/models';
import {AuthModel} from 'infrastructure/aws/cognito/auth.model';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';

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
const forgotPasswordResponseModel: ForgotPasswordResponseModel = {
    destination: 'destination',
    deliveryMedium: 'deliveryMedium',
    attributeName: 'attributeName',
};

@Module({
    exports: [IAuthService],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        EventEmitterModule.forRoot(),
    ],
    providers: [
        {
            provide: IAuthService,
            useValue: {
                signUp: jest.fn(() => Promise.resolve(authModel)),
                signIn: jest.fn(() => Promise.resolve(authResultModel)),
                getTokenClaims: jest.fn(() => Promise.resolve(tokenClaims)),
                confirmSignUp: jest.fn(() => Promise.resolve()),
                resendConfirmSignUpCode: jest.fn(() => Promise.resolve(resendConfirmationCodeResultModel)),
                forgotPassword: jest.fn(() => Promise.resolve(forgotPasswordResponseModel)),
                confirmForgotPassword: jest.fn(() => Promise.resolve()),
                deleteUser: jest.fn(() => Promise.resolve()),
            },
        },
        {
            provide: RequestUserService,
            useFactory: (authService: IAuthService) => {
                return new RequestUserService(authService);
            },
            inject: [IAuthService],
        },
        {
            provide: IMailSenderService,
            useValue: {
                sendMail: jest.fn(() => Promise.resolve()),
            },
        },
    ],
})
export class TestModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AssignUserMiddleware).exclude('static/(.*)').forRoutes({path: '*', method: RequestMethod.ALL});
    }
}
