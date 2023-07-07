import {PersonSuggestedContactDto} from 'domain/dtos/request/suggested-contact/person-suggested-contact.dto';
import {PersonSuggestedContact} from 'domain/entities/person-suggested-contact.entity';

export interface IPersonSuggestedContactEntityMapper {
    mapByPersonSuggestedContactDto(suggestedContactDto: PersonSuggestedContactDto): PersonSuggestedContact;
}

export const IPersonSuggestedContactEntityMapper = Symbol('IPersonSuggestedContactEntityMapper');
