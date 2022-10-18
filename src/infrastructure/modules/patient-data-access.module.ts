import {Module} from '@nestjs/common';
import {PatientController, DoctorController} from 'controllers/patient-data-access';
import {IUserRepository, IPatientDataAccessRepository} from 'app/repositories';
import {UserRepository, PatientDataAccessRepository} from 'infrastructure/repositories';
import {IAuthService} from 'app/services/auth.service';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PatientDataAccessModel} from 'infrastructure/models';
import {PatientUseCasesFactory, DoctorUseCasesFactory} from 'infrastructure/factories/patient-data-access';
import {IPatientDataAccessEntityMapper} from 'app/mappers/patient-data-access-entity.mapper';
import {PatientDataAccessEntityMapper} from 'infrastructure/mappers/patient-data-access-model.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([PatientDataAccessModel])],
    controllers: [PatientController, DoctorController],
    providers: [
        PatientUseCasesFactory,
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
        {
            provide: IPatientDataAccessEntityMapper,
            useClass: PatientDataAccessEntityMapper,
        },
    ],
})
export class PatientDataAccessModule {}
