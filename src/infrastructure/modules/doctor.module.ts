import {Module} from '@nestjs/common';
import {DataAccessController} from 'controllers/doctor/data-access.controller';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {UserRepository, PatientDataAccessRepository} from 'infrastructure/repositories';
import {IAuthService} from 'app/services/auth.service';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDataAccessModel} from 'presentation/models';
import {DoctorUseCasesFactory} from 'infrastructure/factories/doctor-use-cases.factory';

@Module({
    imports: [TypeOrmModule.forFeature([PatientDataAccessModel])],
    controllers: [DataAccessController],
    providers: [
        DoctorUseCasesFactory,
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
    ],
})
export class DoctorModule {}
