import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/emergency-contact';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {EmergencyContactRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmergencyContactModel} from 'infrastructure/models';
import {DoctorUseCasesFactory, PatientUseCasesFactory} from 'infrastructure/factories/emergency-contact';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {EmergencyContactModelMapper} from 'infrastructure/mappers/emergency-contact-model.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';

@Module({
    imports: [TypeOrmModule.forFeature([EmergencyContactModel]), AuthModule, PatientDataAccessModule],
    controllers: [DoctorController, PatientController],
    providers: [
        DoctorUseCasesFactory,
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
