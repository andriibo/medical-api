import { SignInUseCase, SignUpUseCase } from 'app/use-cases/auth';
import { AuthController } from 'controllers/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from 'controllers/app.controller';
import { UsersController } from 'controllers/users.controller';
import { HelloUseCase } from 'app/use-cases/hello.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConnectionOptions } from 'config/db.config';
import { CognitoService } from 'infrastructure/aws/cognito.service';
import { ConfigModule } from '@nestjs/config';
import { IAuthService } from 'app/abstractions/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from 'presentation/middlewares/errors-interceptor';

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
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
