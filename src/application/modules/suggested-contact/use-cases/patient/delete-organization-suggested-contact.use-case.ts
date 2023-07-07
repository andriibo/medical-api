import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {OrganizationSuggestedContact} from 'domain/entities/organization-suggested-contact.entity';
import {IOrganizationSuggestedContactRepository} from 'app/modules/suggested-contact/repositories';
import {EntityNotFoundError} from 'app/errors';
import {DeleteOrganizationSuggestedContactByPatientService} from 'app/modules/suggested-contact/services';

export class DeleteOrganizationSuggestedContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly contactRepository: IOrganizationSuggestedContactRepository,
        private readonly deleteSuggestedContactByPatientService: DeleteOrganizationSuggestedContactByPatientService,
    ) {}

    public async deleteContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        await this.deleteSuggestedContactByPatientService.deleteSuggestedContact(user, contact);
    }

    private async getContact(contactId: string): Promise<OrganizationSuggestedContact> {
        const contact = await this.contactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Suggested Contact Not Found.');
        }

        return contact;
    }
}
