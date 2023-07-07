import {Module} from '@nestjs/common';
import {GrantedUserController, PatientController} from 'controllers/suggested-contact';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from 'infrastructure/modules/auth/auth.module';
import {EmergencyContactModule} from 'infrastructure/modules/emergency-contact/emergency-contact.module';
import {PatientDataAccessModule} from 'infrastructure/modules/patient-data-access/patient-data-access.module';
import {
    PersonSuggestedContactModel,
    PersonSuggestedContactRepository,
    OrganizationSuggestedContactModel,
    OrganizationSuggestedContactRepository,
} from './models';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {
    IPersonSuggestedContactRepository,
    IOrganizationSuggestedContactRepository,
} from 'app/modules/suggested-contact/repositories';
import {IPersonSuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-entity.mapper';
import {IOrganizationSuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/organization-suggested-contact-entity.mapper';
import {PersonSuggestedContactModelMapper} from './mappers/person-suggested-contact-model.mapper';
import {OrganizationSuggestedContactModelMapper} from './mappers/organization-suggested-contact-model.mapper';
import {
    ApprovePersonSuggestedContactByPatientService,
    ApproveOrganizationSuggestedContactByPatientService,
    DeletePersonSuggestedContactByPatientService,
    DeletePersonSuggestedContactByGrantedUserService,
    DeleteOrganizationSuggestedContactByPatientService,
    DeleteOrganizationSuggestedContactByGrantedUserService,
} from 'app/modules/suggested-contact/services';
import {GrantedUserUseCasesFactory, PatientUseCasesFactory} from './factories';
import {IPersonEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/person-emergency-contact-entity.mapper';
import {IOrganizationEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/organization-emergency-contact-entity.mapper';
import {
    PersonEmergencyContactSpecification,
    OrganizationEmergencyContactSpecification,
} from 'app/modules/emergency-contact/specifications';
import {
    IPersonEmergencyContactRepository,
    IOrganizationEmergencyContactRepository,
} from 'app/modules/emergency-contact/repositories';
import {PatientDataAccessSpecification} from 'app/modules/patient-data-access/specifications/patient-data-access.specification';
import {UserIndependentModule} from 'infrastructure/modules/auth/user.ind.module';
import {PersonSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-dto.mapper';
import {OrganizationSuggestedContactDtoMapper} from 'app/modules/suggested-contact/mappers/organization-suggested-contact-dto.mapper';

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonSuggestedContactModel, OrganizationSuggestedContactModel]),
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
            provide: IPersonSuggestedContactRepository,
            useClass: PersonSuggestedContactRepository,
        },
        {
            provide: IOrganizationSuggestedContactRepository,
            useClass: OrganizationSuggestedContactRepository,
        },
        {
            provide: IPersonSuggestedContactEntityMapper,
            useClass: PersonSuggestedContactModelMapper,
        },
        {
            provide: IOrganizationSuggestedContactEntityMapper,
            useClass: OrganizationSuggestedContactModelMapper,
        },
        {
            provide: PersonSuggestedContactDtoMapper,
            useClass: PersonSuggestedContactDtoMapper,
        },
        {
            provide: OrganizationSuggestedContactDtoMapper,
            useClass: OrganizationSuggestedContactDtoMapper,
        },
        {
            provide: DeletePersonSuggestedContactByGrantedUserService,
            useFactory: (
                contactRepository: IPersonSuggestedContactRepository,
                contactSpecification: SuggestedContactSpecification,
            ) => {
                return new DeletePersonSuggestedContactByGrantedUserService(contactRepository, contactSpecification);
            },
            inject: [IPersonSuggestedContactRepository, SuggestedContactSpecification],
        },
        {
            provide: DeleteOrganizationSuggestedContactByGrantedUserService,
            useFactory: (
                contactRepository: IOrganizationSuggestedContactRepository,
                contactSpecification: SuggestedContactSpecification,
            ) => {
                return new DeleteOrganizationSuggestedContactByGrantedUserService(
                    contactRepository,
                    contactSpecification,
                );
            },
            inject: [IOrganizationSuggestedContactRepository, SuggestedContactSpecification],
        },
        {
            provide: DeletePersonSuggestedContactByPatientService,
            useFactory: (
                contactRepository: IPersonSuggestedContactRepository,
                contactSpecification: SuggestedContactSpecification,
            ) => {
                return new DeletePersonSuggestedContactByPatientService(contactRepository, contactSpecification);
            },
            inject: [IPersonSuggestedContactRepository, SuggestedContactSpecification],
        },
        {
            provide: DeleteOrganizationSuggestedContactByPatientService,
            useFactory: (
                contactRepository: IOrganizationSuggestedContactRepository,
                contactSpecification: SuggestedContactSpecification,
            ) => {
                return new DeleteOrganizationSuggestedContactByPatientService(contactRepository, contactSpecification);
            },
            inject: [IOrganizationSuggestedContactRepository, SuggestedContactSpecification],
        },
        {
            provide: ApprovePersonSuggestedContactByPatientService,
            useFactory: (
                suggestedContactRepository: IPersonSuggestedContactRepository,
                suggestedContactSpecification: SuggestedContactSpecification,
                emergencyContactEntityMapper: IPersonEmergencyContactEntityMapper,
                emergencyContactSpecification: PersonEmergencyContactSpecification,
                emergencyContactRepository: IPersonEmergencyContactRepository,
            ) => {
                return new ApprovePersonSuggestedContactByPatientService(
                    suggestedContactRepository,
                    suggestedContactSpecification,
                    emergencyContactEntityMapper,
                    emergencyContactSpecification,
                    emergencyContactRepository,
                );
            },
            inject: [
                IPersonSuggestedContactRepository,
                SuggestedContactSpecification,
                IPersonEmergencyContactEntityMapper,
                PersonEmergencyContactSpecification,
                IPersonEmergencyContactRepository,
            ],
        },
        {
            provide: ApproveOrganizationSuggestedContactByPatientService,
            useFactory: (
                suggestedContactRepository: IOrganizationSuggestedContactRepository,
                suggestedContactSpecification: SuggestedContactSpecification,
                emergencyContactEntityMapper: IOrganizationEmergencyContactEntityMapper,
                emergencyContactSpecification: OrganizationEmergencyContactSpecification,
                emergencyContactRepository: IOrganizationEmergencyContactRepository,
            ) => {
                return new ApproveOrganizationSuggestedContactByPatientService(
                    suggestedContactRepository,
                    suggestedContactSpecification,
                    emergencyContactEntityMapper,
                    emergencyContactSpecification,
                    emergencyContactRepository,
                );
            },
            inject: [
                IOrganizationSuggestedContactRepository,
                SuggestedContactSpecification,
                IOrganizationEmergencyContactEntityMapper,
                OrganizationEmergencyContactSpecification,
                IOrganizationEmergencyContactRepository,
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
