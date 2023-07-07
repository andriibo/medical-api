import {PersonSuggestedContactDto} from './person-suggested-contact.dto';
import {OrganizationSuggestedContactDto} from './organization-suggested-contact.dto';

export class SuggestedContactsDto {
    public persons: PersonSuggestedContactDto[] = [];

    public organizations: OrganizationSuggestedContactDto[] = [];
}
