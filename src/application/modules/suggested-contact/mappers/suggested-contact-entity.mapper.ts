import {SuggestedContactDto} from 'domain/dtos/request/suggested-contact/suggested-contact.dto';
import {SuggestedContact} from 'domain/entities/suggested-contact.entity';

export interface ISuggestedContactEntityMapper {
    mapBySuggestedContactDto(suggestedContactDto: SuggestedContactDto): SuggestedContact;
}

export const ISuggestedContactEntityMapper = Symbol('ISuggestedContactEntityMapper');
