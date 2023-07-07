import {OrganizationSuggestedContact, User} from 'domain/entities';
import {IOrganizationSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {SuggestedContactSpecification} from 'app/modules/suggested-contact/specifications/suggested-contact.specification';

export class DeleteOrganizationSuggestedContactByPatientService {
    public constructor(
        private readonly contactRepository: IOrganizationSuggestedContactRepository,
        private readonly contactSpecification: SuggestedContactSpecification,
    ) {}

    public async deleteSuggestedContact(patient: User, suggestedContact: OrganizationSuggestedContact): Promise<void> {
        this.contactSpecification.assertPatientCanModifyContact(patient, suggestedContact);

        await this.contactRepository.delete(suggestedContact);
    }
}
