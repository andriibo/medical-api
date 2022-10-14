import {IEmergencyContactRepository} from 'app/repositories';
import {IAuthedUserService} from 'app/services/authed-user.service';
import {DeleteContactDto} from 'domain/dtos/emergency-contact/delete-contact.dto';
import {EmergencyContact} from 'domain/entities/emergency-contact.entity';
import {EmergencyContactSpecification} from 'app/specifications/emergency-contact.specification';

export class DeleteContactUseCase {
    constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly emergencyContactRepository: IEmergencyContactRepository,
        private readonly emergencyContactSpecification: EmergencyContactSpecification,
    ) {}

    public async deleteContact(dto: DeleteContactDto): Promise<void> {
        const user = await this.authedUserService.getUser();
        const contact = await this.getContact(dto);

        await this.emergencyContactSpecification.assertUserCanDeleteContact(user, contact);

        await this.emergencyContactRepository.delete(contact);
    }

    private async getContact(dto: DeleteContactDto): Promise<EmergencyContact> {
        const contact = await this.emergencyContactRepository.getOneByContactId(dto.contactId);

        if (contact === null) {
            throw new Error('Contact Not Found.');
        }

        return contact;
    }
}
