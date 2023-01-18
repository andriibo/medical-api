import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AssignUserMiddleware} from 'presentation/middlewares/assign-user.middleware';
import {RequestUserService} from 'infrastructure/services/request-user.service';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ConfigModule} from '@nestjs/config';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {IMailSenderService} from 'app/modules/mail/services/abstract/mail-sender.service';

const tokenClaims = {
    sub: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
    'cognito:groups': ['Doctor'],
    exp: currentUnixTimestamp() + 3600,
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
                getTokenClaims: jest.fn(() => Promise.resolve(tokenClaims)),
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
