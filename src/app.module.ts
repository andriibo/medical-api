import {Module} from '@nestjs/common';
import {AppController} from 'controllers/app.controller';
import {UsersController} from 'controllers/users.controller';
import {HelloUseCase} from 'app/use-cases/hello.use-case';
import {TypeOrmModule} from '@nestjs/typeorm';
import {dbConnectionOptions} from 'config/db.config';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConnectionOptions),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    exports: [
        TypeOrmModule,
        CognitoService,
    ],
    controllers: [
        AppController,
        UsersController,
    ],
    providers: [
        HelloUseCase,
        CognitoService,
    ],
})

export class AppModule {}
