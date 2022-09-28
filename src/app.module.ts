import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {UsersModule} from './users/users.module';
import {dbConnectionOptions} from './config/db.config';
import {CognitoService} from './infrastructure/aws/cognito.service';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConnectionOptions),
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    exports: [
        TypeOrmModule,
        CognitoService,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        CognitoService,
    ],
})

export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
