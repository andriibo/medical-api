import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {UsersModule} from './users/users.module';
import {dbConnectionOptions} from './config/db.config';
import { CognitoService } from './infrastructure/aws/cognito.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConnectionOptions),
        UsersModule,
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
