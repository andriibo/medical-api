import {Module} from '@nestjs/common';
import {DataAccessController} from 'controllers/patient/data-access.controller';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {UserRepository, PatientDataAccessRepository} from 'infrastructure/repositories';
import {IAuthService} from 'app/services/auth.service';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDataAccessModel} from 'presentation/models';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-use-cases.factory';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessEntityMapper} from 'infrastructure/mappers/patient-data-access-model.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([PatientDataAccessModel])],
    controllers: [DataAccessController],
    providers: [
        PatientUseCasesFactory,
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IPatientDataAccessRepository,
            useClass: PatientDataAccessRepository,
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
            provide: IPatientDataAccessEntityMapper,
            useClass: PatientDataAccessEntityMapper,
        },
    ],
})
export class PatientModule {}
