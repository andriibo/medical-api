import {IPersonEmergencyContactRepository} from 'app/modules/emergency-contact/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {PersonEmergencyContact} from 'domain/entities/person-emergency-contact.entity';
import {PersonEmergencyContactSpecification} from 'app/modules/emergency-contact/specifications';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class DeletePersonContactUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IPersonEmergencyContactRepository,
        private readonly emergencyContactSpecification: PersonEmergencyContactSpecification,
    ) {}

    public async deleteContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        await this.emergencyContactSpecification.assertUserCanDeletePersonContact(user, contact);
        await this.emergencyContactRepository.delete(contact);
    }

    private async getContact(contactId: string): Promise<PersonEmergencyContact> {
        const contact = await this.emergencyContactRepository.getOneById(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Contact Not Found.');
        }

        return contact;
    }
}
