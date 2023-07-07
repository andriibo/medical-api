import {PersonContactDto} from './person-contact.dto';
import {OrganizationContactDto} from './organization-contact.dto';

export class ContactsDto {
    public persons: PersonContactDto[] = [];

    public organizations: OrganizationContactDto[] = [];
}
