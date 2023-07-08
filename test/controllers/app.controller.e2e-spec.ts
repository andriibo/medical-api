import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppController} from 'controllers/app.controller';
import {CognitoService} from 'infrastructure/aws/cognito/cognito.service';
import {TestModule} from 'tests/test.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TestModule],
            controllers: [AppController],
            providers: [CognitoService],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer()).get('/').expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
