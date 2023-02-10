import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AssignUserMiddleware} from 'presentation/middlewares/assign-user.middleware';
import {RequestUserService} from 'infrastructure/services/request-user.service';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ConfigModule} from '@nestjs/config';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {IMailSender} from 'app/modules/mail/services/abstract/mail-sender';

const exp = currentUnixTimestamp() + 3600;
const tokenClaims = {
    doctor: {
        sub: '8bfbd95c-c8a5-404b-b3eb-6ac648052ac4',
        'cognito:groups': ['Doctor'],
        exp: exp,
    },
    caregiver: {
        sub: '4babe90f-b1a3-145e-c0mz-9aq248098ac0',
        'cognito:groups': ['Caregiver'],
        exp: exp,
    },
    patient: {
        sub: 'bd58571c-c935-41e9-9e08-a8d4e0e93f5f',
        'cognito:groups': ['Patient'],
        exp: exp,
    },
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
                getTokenClaimsByToken: jest.fn((role: string) => Promise.resolve(tokenClaims[role])),
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
            provide: IMailSender,
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
