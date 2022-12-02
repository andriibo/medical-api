import {Module} from '@nestjs/common';
import {DoctorController, GrantedUserController, PatientController} from 'controllers/suggested-contact';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DoctorUseCasesFactory} from 'infrastructure/factories/suggested-contact';
import {AuthModule, EmergencyContactModule} from 'infrastructure/modules';
import {SuggestedContactModel} from 'infrastructure/models/suggested-contact.model';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactRepository} from 'infrastructure/repositories/suggested-contact.repository';
import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {SuggestedContactModelMapper} from 'infrastructure/mappers/suggested-contact-model.mapper';
import {DeleteSuggestedContactByDoctorService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-doctor.service';
import {DeleteSuggestedContactByPatientService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-patient.service';
import {PatientUseCasesFactory} from 'infrastructure/factories/suggested-contact/patient-use-cases.factory';
import {ApproveSuggestedContactByPatientService} from 'app/modules/suggested-contact/services/approve-suggested-contact-by-patient.service';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {GrantedUserUseCasesFactory} from 'infrastructure/factories/suggested-contact/granted-user-use-cases.factory';

@Module({
    imports: [TypeOrmModule.forFeature([SuggestedContactModel]), AuthModule, EmergencyContactModule],
    controllers: [DoctorController, PatientController, GrantedUserController],
    providers: [
        DoctorUseCasesFactory,
        PatientUseCasesFactory,
        GrantedUserUseCasesFactory,
        SuggestedContactSpecification,
        {
            provide: ISuggestedContactRepository,
            useClass: SuggestedContactRepository,
        },
        {
            provide: ISuggestedContactEntityMapper,
            useClass: SuggestedContactModelMapper,
        },
        {
            provide: DeleteSuggestedContactByDoctorService,
            useFactory: (
                suggestedContactRepository: ISuggestedContactRepository,
                suggestedContactSpecification: SuggestedContactSpecification,
            ) => {
                return new DeleteSuggestedContactByDoctorService(
                    suggestedContactRepository,
                    suggestedContactSpecification,
                );
            },
            inject: [ISuggestedContactRepository, SuggestedContactSpecification],
        },
        {
            provide: DeleteSuggestedContactByPatientService,
            useFactory: (
                suggestedContactRepository: ISuggestedContactRepository,
                suggestedContactSpecification: SuggestedContactSpecification,
            ) => {
                return new DeleteSuggestedContactByPatientService(
                    suggestedContactRepository,
                    suggestedContactSpecification,
                );
            },
            inject: [ISuggestedContactRepository, SuggestedContactSpecification],
        },
        {
            provide: ApproveSuggestedContactByPatientService,
            useFactory: (
                suggestedContactRepository: ISuggestedContactRepository,
                suggestedContactSpecification: SuggestedContactSpecification,
                emergencyContactEntityMapper: IEmergencyContactEntityMapper,
                emergencyContactSpecification: EmergencyContactSpecification,
                emergencyContactRepository: IEmergencyContactRepository,
            ) => {
                return new ApproveSuggestedContactByPatientService(
                    suggestedContactRepository,
                    suggestedContactSpecification,
                    emergencyContactEntityMapper,
                    emergencyContactSpecification,
                    emergencyContactRepository,
                );
            },
            inject: [
                ISuggestedContactRepository,
                SuggestedContactSpecification,
                IEmergencyContactEntityMapper,
                EmergencyContactSpecification,
                IEmergencyContactRepository,
            ],
        },
    ],
})
export class SuggestedContactModule {}
