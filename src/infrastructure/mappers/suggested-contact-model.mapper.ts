import {ISuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/suggested-contact-entity.mapper';
import {SuggestedContactDto} from 'domain/dtos/request/suggested-contact/suggested-contact.dto';
import {SuggestedContact} from 'domain/entities/suggested-contact.entity';
import {SuggestedContactModel} from 'infrastructure/models/suggested-contact.model';

export class SuggestedContactModelMapper implements ISuggestedContactEntityMapper {
    public mapBySuggestedContactDto(
        suggestedContactDto: SuggestedContactDto,
        suggestedContact?: SuggestedContact,
    ): SuggestedContact {
        if (!suggestedContact) {
            suggestedContact = new SuggestedContactModel();
        }

        suggestedContact.patientUserId = suggestedContactDto.patientUserId;
        suggestedContact.firstName = suggestedContactDto.firstName;
        suggestedContact.lastName = suggestedContactDto.lastName;
        suggestedContact.email = suggestedContactDto.email;
        suggestedContact.phone = suggestedContactDto.phone;
        suggestedContact.relationship = suggestedContactDto.relationship;

        return suggestedContact;
    }
}
