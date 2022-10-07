import {Module} from '@nestjs/common';
import {AppController} from 'controllers/app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConnectionOptions} from 'config/db.config';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {ConfigModule} from '@nestjs/config';
import {IAuthService} from 'app/services/auth.service';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {ErrorsInterceptor} from 'presentation/middlewares/errors-interceptor';
import {AuthGuard, RolesGuard} from 'presentation/guards';
import {AuthModule, PatientModule} from 'infrastructure/modules';

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
        PatientModule,
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
export class AppModule {}
