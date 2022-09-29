import {SignInUseCase, SignUpUseCase} from 'app/use-cases/auth';
import {AuthController} from 'controllers/auth.controller';
import {Module} from '@nestjs/common';
import {AppController} from 'controllers/app.controller';
import {UsersController} from 'controllers/users.controller';
import {HelloUseCase} from 'app/use-cases/hello.use-case';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConnectionOptions} from 'config/db.config';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {ConfigModule} from '@nestjs/config';
import {IAuthService} from 'app/abstractions/auth.service';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import {ErrorsInterceptor} from 'presentation/middlewares/errors-interceptor';
import {RolesGuard} from 'presentation/guards/roles.guard';
import {AuthGuard} from 'presentation/guards/auth.guard';

const GUARDS = [
    {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },
    {
        provide: APP_GUARD,
        useClass: RolesGuard,
    },
];

const INTERSEPTORS = [
    {
        provide: APP_INTERCEPTOR,
        useClass: ErrorsInterceptor,
    },
];

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConnectionOptions),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    exports: [TypeOrmModule],
    controllers: [AuthController, AppController, UsersController],
    providers: [
        SignInUseCase,
        SignUpUseCase,
        HelloUseCase,
        {
            provide: IAuthService,
            useClass: CognitoService,
        },
        ...INTERSEPTORS,
        ...GUARDS,
    ],
})
export class AppModule {}
