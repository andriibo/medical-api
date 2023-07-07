import {IOrganizationEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {OrganizationEmergencyContact} from 'domain/entities/organization-emergency-contact.entity';
import {OrganizationEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class DeleteOrganizationContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IOrganizationEmergencyContactRepository,
        private readonly emergencyContactSpecification: OrganizationEmergencyContactSpecification,
    ) {}

    public async deleteContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        await this.emergencyContactSpecification.assertUserCanDeleteOrganizationContact(user, contact);
        await this.emergencyContactRepository.delete(contact);
    }

    private async getContact(contactId: string): Promise<OrganizationEmergencyContact> {
        const contact = await this.emergencyContactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Contact Not Found.');
        }

        return contact;
    }
}
