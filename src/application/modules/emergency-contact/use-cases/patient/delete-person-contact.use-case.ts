import {IPersonEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PersonEmergencyContact} from 'domain/entities/person-emergency-contact.entity';
import {PersonEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class DeletePersonContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly contactRepository: IPersonEmergencyContactRepository,
        private readonly contactSpecification: PersonEmergencyContactSpecification,
    ) {}

    public async deleteContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        await this.contactSpecification.assertUserCanDeletePersonContact(user, contact);
        await this.contactRepository.delete(contact);
    }

    private async getContact(contactId: string): Promise<PersonEmergencyContact> {
        const contact = await this.contactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Contact Not Found.');
        }

        return contact;
    }
}
