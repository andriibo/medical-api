import {OrganizationSuggestedContact, User} from 'domain/entities';
import {IOrganizationSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';
import {IOrganizationEmergencyContactEntityMapper} from 'app/modules/emergency-contact/mappers/organization-emergency-contact-entity.mapper';
import {OrganizationEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {IOrganizationEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';

export class ApproveOrganizationSuggestedContactByPatientService {
    public constructor(
        private readonly suggestedContactRepository: IOrganizationSuggestedContactRepository,
        private readonly suggestedContactSpecification: SuggestedContactSpecification,
        private readonly emergencyContactEntityMapper: IOrganizationEmergencyContactEntityMapper,
        private readonly emergencyContactSpecification: OrganizationEmergencyContactSpecification,
        private readonly emergencyContactRepository: IOrganizationEmergencyContactRepository,
    ) {}

    public async approveSuggestedContact(patient: User, suggestedContact: OrganizationSuggestedContact): Promise<void> {
        this.suggestedContactSpecification.assertPatientCanModifyContact(patient, suggestedContact);
        this.emergencyContactSpecification.assertUserCanCreateContact(patient);

        const emergencyContact = this.emergencyContactEntityMapper.mapByOrganizationSuggestedContact(suggestedContact);

        await this.emergencyContactRepository.create(emergencyContact);
        await this.suggestedContactRepository.delete(suggestedContact);
    }
}
