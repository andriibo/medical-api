import {Module} from '@nestjs/common';
import {DataAccessController} from 'controllers/patient/data-access.controller';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {UserRepository, PatientDataAccessRepository} from 'infrastructure/repositories';
import {IAuthService} from 'app/services/auth.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDataAccessModel} from 'presentation/models';
import {PatientUseCasesFactory} from 'infrastructure/factories/patient-use-cases.factory';

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
    ],
})
export class PatientModule {}
