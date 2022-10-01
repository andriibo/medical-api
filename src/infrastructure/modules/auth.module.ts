import {Module} from '@nestjs/common';
import {AuthController} from 'controllers/auth.controller';
import {ConfirmSignUpUserUseCase, SignInUseCase, SignUpUseCase} from 'app/use-cases/auth';
import {IUserRepository} from 'app/abstractions/repositories/user.repository';
import {UserRepository} from 'infrastructure/repositories/user.repository';
import {IAuthService} from 'app/abstractions/services/auth.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel} from 'presentation/models/user.model';
import {IUserEntityMapper} from 'app/abstractions/mappers/user-entity.mapper';
import {UserModelMapper} from 'infrastructure/mappers/user-model.mapper';
import {AuthUseCasesFactory} from 'infrastructure/factories/auth-use-cases.factory';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    controllers: [AuthController],
    providers: [
        ConfirmSignUpUserUseCase,
        SignInUseCase,
        SignUpUseCase,
        AuthUseCasesFactory,
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IAuthService,
            useClass: CognitoService,
        },
        {
            provide: IUserEntityMapper,
            useClass: UserModelMapper,
        },
    ],
})
export class AuthModule {}
