import {Module} from '@nestjs/common';
import {GrantUserController, PatientController} from 'controllers/emergency-contact';
import {
    IPersonEmergencyContactRepository,
    IOrganizationEmergencyContactRepository,
} from 'app/modules/emergency-contact/repositories';
import {TypeOrmModule} from '@nestjs/typeorm';
import {
    PersonEmergencyContactModel,
    PersonEmergencyContactRepository,
    OrganizationEmergencyContactModel,
    OrganizationEmergencyContactRepository,
} from './models';
import {GrantedUserUseCasesFactory, PatientUseCasesFactory} from './factories';
import {IPersonEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/person-emergency-contact-entity.mapper';
import {IOrganizationEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/organization-emergency-contact-entity.mapper';
import {PersonEmergencyContactModelMapper} from './mappers/person-emergency-contact-model.mapper';
import {OrganizationEmergencyContactModelMapper} from './mappers/organization-emergency-contact-model.mapper';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';
import {
    PersonEmergencyContactSpecification,
    OrganizationEmergencyContactSpecification,
} from 'app/modules/emergency-contact/specifications';

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonEmergencyContactModel, OrganizationEmergencyContactModel]),
        AuthModule,
        PatientDataAccessModule,
    ],
    exports: [
        IPersonEmergencyContactRepository,
        IPersonEmergencyContactEntityMapper,
        IOrganizationEmergencyContactRepository,
        IOrganizationEmergencyContactEntityMapper,
        PersonEmergencyContactSpecification,
        OrganizationEmergencyContactSpecification,
    ],
    controllers: [GrantUserController, PatientController],
    providers: [
        GrantedUserUseCasesFactory,
        PatientUseCasesFactory,
        {
            provide: PersonEmergencyContactSpecification,
            useFactory: (emergencyContactRepository: IPersonEmergencyContactRepository) => {
                return new PersonEmergencyContactSpecification(emergencyContactRepository);
            },
            inject: [IPersonEmergencyContactRepository],
        },
        {
            provide: OrganizationEmergencyContactSpecification,
            useFactory: (emergencyContactRepository: IOrganizationEmergencyContactRepository) => {
                return new OrganizationEmergencyContactSpecification(emergencyContactRepository);
            },
            inject: [IOrganizationEmergencyContactRepository],
        },
        {
            provide: IPersonEmergencyContactRepository,
            useClass: PersonEmergencyContactRepository,
        },
        {
            provide: IOrganizationEmergencyContactRepository,
            useClass: OrganizationEmergencyContactRepository,
        },
        {
            provide: IPersonEmergencyContactEntityMapper,
            useClass: PersonEmergencyContactModelMapper,
        },
        {
            provide: IOrganizationEmergencyContactEntityMapper,
            useClass: OrganizationEmergencyContactModelMapper,
        },
    ],
})
export class EmergencyContactModule {}
