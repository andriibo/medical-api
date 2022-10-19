import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from 'controllers/app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConnectionOptions} from 'config/db.config';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {ConfigModule} from '@nestjs/config';
import {IAuthService} from 'app/services/auth.service';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {ErrorsInterceptor} from 'presentation/interceptors/errors.interceptor';
import {AuthGuard, RolesGuard} from 'presentation/guards';
import {
    AuthModule,
    VitalModule,
    PatientDataAccessModule,
    EmergencyContactModule,
    ProfileModule,
    MailModule,
} from 'infrastructure/modules';
import {AssignUserMiddleware} from 'presentation/middlewares/assign-user.middleware';

const GUARDS = [AuthGuard, RolesGuard];

const INTERCEPTORS = [
    {
        provide: APP_INTERCEPTOR,
        useClass: ErrorsInterceptor,
    },
];

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...dbConnectionOptions,
            autoLoadEntities: true,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        VitalModule,
        PatientDataAccessModule,
        EmergencyContactModule,
        ProfileModule,
        MailModule,
    ],
    exports: [TypeOrmModule],
    controllers: [AppController],
    providers: [
        {
            provide: IAuthService,
            useClass: CognitoService,
        },
        // ...INTERCEPTORS,
        ...GUARDS,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AssignUserMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
    }
}
