import {Module} from '@nestjs/common';
import {AuthController} from 'controllers/auth.controller';
import {IUserRepository} from 'app/repositories';
import {UserRepository} from 'infrastructure/repositories/user.repository';
import {IAuthService} from 'app/services/auth.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModel, DoctorMetadataModel, PatientMetadataModel} from 'presentation/models';
import {IUserEntityMapper} from 'app/mappers/user-entity.mapper';
import {UserModelMapper} from 'infrastructure/mappers/user-model.mapper';
import {AuthUseCasesFactory} from 'infrastructure/factories/auth-use-cases.factory';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel, DoctorMetadataModel, PatientMetadataModel])],
    exports: [IAuthService, IAuthedUserService],
    controllers: [AuthController],
    providers: [
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
            provide: IAuthedUserService,
            useClass: AuthedUserService,
        },
        {
            provide: IUserEntityMapper,
            useClass: UserModelMapper,
        },
    ],
})
export class AuthModule {}
