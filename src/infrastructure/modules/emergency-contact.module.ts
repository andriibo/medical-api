import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/emergency-contact';
import {IUserRepository, IEmergencyContactRepository, IPatientDataAccessRepository} from 'app/repositories';
import {UserRepository, EmergencyContactRepository, PatientDataAccessRepository} from 'infrastructure/repositories';
import {IAuthService} from 'app/services/auth.service';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmergencyContactModel} from 'presentation/models';
import {DoctorUseCasesFactory, PatientUseCasesFactory} from 'infrastructure/factories/emergency-contact';
import {IEmergencyContactEntityMapper} from 'app/mappers/emergency-contact-entity.mapper';
import {EmergencyContactModelMapper} from 'infrastructure/mappers/emergency-contact-model.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([EmergencyContactModel])],
    controllers: [DoctorController, PatientController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        {
            provide: IEmergencyContactRepository,
            useClass: EmergencyContactRepository,
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
            provide: IEmergencyContactEntityMapper,
            useClass: EmergencyContactModelMapper,
        },
        {
            provide: IPatientDataAccessRepository,
            useClass: PatientDataAccessRepository,
        },
    ],
})
export class EmergencyContactModule {}
