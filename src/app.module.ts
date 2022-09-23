import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {UsersModule} from './users/users.module';
import {dbConnectionOptions} from './config/db.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(dbConnectionOptions),
        UsersModule,
    ],
    exports: [TypeOrmModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
