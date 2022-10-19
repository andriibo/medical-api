import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {ConfigModule} from '@nestjs/config';
import {AppController} from 'controllers/app.controller';
import {CognitoService} from 'infrastructure/aws/cognito.service';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
            ],
            controllers: [AppController],
            providers: [CognitoService],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200).expect({message: 'Hello World!'});
    });
});
