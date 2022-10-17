import {Module} from '@nestjs/common';
import {PatientController} from 'controllers/emergency-contact/patient.controller';
import {IUserRepository, IEmergencyContactRepository} from 'app/repositories';
import {UserRepository, EmergencyContactRepository} from 'infrastructure/repositories';
import {IAuthService} from 'app/services/auth.service';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {CognitoService} from 'infrastructure/aws/cognito.service';
import {AuthedUserService} from 'infrastructure/services/authed-user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmergencyContactModel} from 'presentation/models';
import {PatientUseCasesFactory} from 'infrastructure/factories/emergency-contact';
import {IEmergencyContactEntityMapper} from 'app/mappers/emergency-contact-entity.mapper';
import {EmergencyContactModelMapper} from 'infrastructure/mappers/emergency-contact-model.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([EmergencyContactModel])],
    controllers: [PatientController],
    providers: [
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
    ],
})
export class EmergencyContactModule {}
