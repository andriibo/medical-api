import {IPersonSuggestedContactEntityMapper} from 'app/modules/suggested-contact/mappers/person-suggested-contact-entity.mapper';
import {PersonSuggestedContactDto} from 'domain/dtos/request/suggested-contact/person-suggested-contact.dto';
import {PersonSuggestedContact} from 'domain/entities/person-suggested-contact.entity';
import {PersonSuggestedContactModel} from 'infrastructure/modules/suggected-contact/models';

export class PersonSuggestedContactModelMapper implements IPersonSuggestedContactEntityMapper {
    public mapByPersonSuggestedContactDto(suggestedContactDto: PersonSuggestedContactDto): PersonSuggestedContact {
        const suggestedContact = new PersonSuggestedContactModel();
        suggestedContact.patientUserId = suggestedContactDto.patientUserId;
        suggestedContact.firstName = suggestedContactDto.firstName;
        suggestedContact.lastName = suggestedContactDto.lastName;
        suggestedContact.email = suggestedContactDto.email;
        suggestedContact.phone = suggestedContactDto.phone;
        suggestedContact.relationship = suggestedContactDto.relationship;

        return suggestedContact;
    }
}
