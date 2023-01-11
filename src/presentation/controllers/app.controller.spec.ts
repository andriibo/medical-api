import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {CognitoService} from 'infrastructure/aws/cognito/cognito.service';
import {ConfigModule} from '@nestjs/config';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
            ],
            controllers: [AppController],
            providers: [CognitoService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toStrictEqual({message: 'Hello World!'});
        });
    });
});
