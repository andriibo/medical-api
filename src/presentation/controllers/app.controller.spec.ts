import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {HelloUseCase} from 'app/use-cases/hello.use-case';
import {CognitoService} from 'infrastructure/aws/cognito.service';
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
            providers: [HelloUseCase, CognitoService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
});
