import {ApiProperty} from '@nestjs/swagger';
import {ContactsDto} from 'domain/dtos/response/emergency-contact';
import {PersonContactView} from './person-contact.view';
import {OrganizationContactView} from './organization-contact.view';

export class ContactsView extends ContactsDto {
    @ApiProperty({isArray: true, type: PersonContactView})
    public persons: PersonContactView[] = [];

    @ApiProperty({isArray: true, type: OrganizationContactView})
    public organizations: OrganizationContactView[] = [];
}
