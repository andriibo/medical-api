import {Module} from '@nestjs/common';
import {GrantUserController, PatientController} from 'controllers/emergency-contact';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmergencyContactModel, EmergencyContactRepository} from './models';
import {GrantedUserUseCasesFactory, PatientUseCasesFactory} from './factories';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {EmergencyContactModelMapper} from './mappers/emergency-contact-model.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';

@Module({
    imports: [TypeOrmModule.forFeature([EmergencyContactModel]), AuthModule, PatientDataAccessModule],
    exports: [IEmergencyContactRepository, IEmergencyContactEntityMapper, EmergencyContactSpecification],
    controllers: [GrantUserController, PatientController],
    providers: [
        GrantedUserUseCasesFactory,
        PatientUseCasesFactory,
        {
            provide: EmergencyContactSpecification,
            useFactory: (emergencyContactRepository: IEmergencyContactRepository) => {
                return new EmergencyContactSpecification(emergencyContactRepository);
            },
            inject: [IEmergencyContactRepository],
        },
        {
            provide: IEmergencyContactRepository,
            useClass: EmergencyContactRepository,
        },
        {
            provide: IEmergencyContactEntityMapper,
            useClass: EmergencyContactModelMapper,
        },
    ],
})
export class EmergencyContactModule {}
