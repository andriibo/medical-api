import {Module} from '@nestjs/common';
import {DoctorController, PatientController} from 'controllers/emergency-contact';
import {IUserRepository, IEmergencyContactRepository} from 'app/repositories';
import {UserRepository, EmergencyContactRepository} from 'infrastructure/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmergencyContactModel} from 'infrastructure/models';
import {DoctorUseCasesFactory, PatientUseCasesFactory} from 'infrastructure/factories/emergency-contact';
import {IEmergencyContactEntityMapper} from 'app/mappers/emergency-contact-entity.mapper';
import {EmergencyContactModelMapper} from 'infrastructure/mappers/emergency-contact-model.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';

@Module({
    imports: [TypeOrmModule.forFeature([EmergencyContactModel]), AuthModule, PatientDataAccessModule],
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
            provide: IEmergencyContactEntityMapper,
            useClass: EmergencyContactModelMapper,
        },
    ],
})
export class EmergencyContactModule {}
