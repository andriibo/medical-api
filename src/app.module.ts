import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {User} from './users/user.entity';
import {UsersModule} from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'root',
            password: 'q1w2e3',
            database: 'medical',
            entities: [User],
            synchronize: true,
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
