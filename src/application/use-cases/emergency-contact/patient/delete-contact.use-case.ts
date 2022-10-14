import {IEmergencyContactRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {EmergencyContact} from 'domain/entities/emergency-contact.entity';
import {EmergencyContactSpecification} from 'app/specifications/emergency-contact.specification';
import {EntityNotFoundError} from 'app/errors/entity-not-found.error';

export class DeleteContactUseCase {
    constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
    ) {}

    public async deleteContact(contactId: string): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(contactId);

        await this.emergencyContactSpecification.assertUserCanDeleteContact(user, contact);

        await this.emergencyContactRepository.delete(contact);
    }

    private async getContact(contactId: string): Promise<EmergencyContact> {
        const contact = await this.emergencyContactRepository.getOneByContactId(contactId);

        if (contact === null) {
            throw new EntityNotFoundError('Contact Not Found.');
        }

        return contact;
    }
}
