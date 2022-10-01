import {Module} from '@nestjs/common';
import {AuthController} from 'controllers/auth.controller';
import {ConfirmSignUpUserUseCase, SignInUseCase, SignUpUseCase} from 'app/use-cases/auth';
import {IUserRepository} from 'app/abstractions/repositories/user.repository';
import {UserRepository} from 'infrastructure/repositories/user.repository';
import {IAuthService} from 'app/abstractions/services/auth.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from 'domain/entities/user.entity';
import {UserEntityFactory} from 'app/factories/user-entity.factory';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        ConfirmSignUpUserUseCase,
        SignInUseCase,
        SignUpUseCase,
        UserEntityFactory,
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IAuthService,
            useClass: CognitoService,
        },
    ],
})
export class AuthModule {}
