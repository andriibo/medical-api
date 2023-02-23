import {Module} from '@nestjs/common';
import {GrantedUserController, PatientController} from 'controllers/suggested-contact';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {EmergencyContactModule} from 'infrastructure/modules/emergency-contact/emergency-contact.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {SuggestedContactModel, SuggestedContactRepository} from './models';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {ISuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {SuggestedContactModelMapper} from './mappers/suggested-contact-model.mapper';
import {DeleteSuggestedContactByGrantedUserService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-granted-user.service';
import {DeleteSuggestedContactByPatientService} from 'app/modules/suggested-contact/services/delete-suggested-contact-by-patient.service';
import {GrantedUserUseCasesFactory, PatientUseCasesFactory} from './factories';
import {ApproveSuggestedContactByPatientService} from 'app/modules/suggested-contact/services/approve-suggested-contact-by-patient.service';
import {IEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/emergency-contact-entity.mapper';
import {EmergencyContactSpecification} from 'app/modules/emergency-contact/specifications/emergency-contact.specification';
import {IEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {UserIndependentModule} from 'infrastructure/modules/auth/user.ind.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SuggestedContactModel]),
        AuthModule,
        UserIndependentModule,
        EmergencyContactModule,
        PatientDataAccessModule,
    ],
    controllers: [PatientController, GrantedUserController],
    providers: [
        PatientUseCasesFactory,
        GrantedUserUseCasesFactory,
        {
            provide: ISuggestedContactRepository,
            useClass: SuggestedContactRepository,
        },
        {
            provide: ISuggestedContactEntityMapper,
            useClass: SuggestedContactModelMapper,
        },
        {
            provide: DeleteSuggestedContactByGrantedUserService,
            useFactory: (
                suggestedContactRepository: ISuggestedContactRepository,
                suggestedContactSpecification: SuggestedContactSpecification,
            ) => {
                return new DeleteSuggestedContactByGrantedUserService(
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
        {
            provide: SuggestedContactSpecification,
            useFactory: (patientDataAccessSpecification: PatientDataAccessSpecification) => {
                return new SuggestedContactSpecification(patientDataAccessSpecification);
            },
            inject: [PatientDataAccessSpecification],
        },
    ],
})
export class SuggestedContactModule {}
