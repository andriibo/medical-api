import {Module} from '@nestjs/common';
import {GrantUserController, PatientController} from 'controllers/emergency-contact';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {EmergencyContactRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmergencyContactModel} from 'infrastructure/models';
import {GrantedUserUseCasesFactory, PatientUseCasesFactory} from 'infrastructure/factories/emergency-contact';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {EmergencyContactModelMapper} from 'infrastructure/mappers/emergency-contact-model.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';

@Module({
    imports: [TypeOrmModule.forFeature([EmergencyContactModel]), AuthModule, PatientDataAccessModule],
    exports: [IEmergencyContactRepository, IEmergencyContactEntityMapper, EmergencyContactSpecification],
    controllers: [GrantUserController, PatientController],
    providers: [
        GrantedUserUseCasesFactory,
        PatientUseCasesFactory,
        EmergencyContactSpecification,
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
