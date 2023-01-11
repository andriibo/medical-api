import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {CognitoService} from 'infrastructure/aws/cognito/cognito.service';
import {ConfigModule} from '@nestjs/config';

describe('AuthController', () => {
    let authController: AuthController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
            ],
            controllers: [AuthController],
            providers: [CognitoService],
        }).compile();

        authController = app.get<AuthController>(AuthController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(authController.signUpPatient()).toStrictEqual({message: 'Hello World!'});
        });
    });
});
