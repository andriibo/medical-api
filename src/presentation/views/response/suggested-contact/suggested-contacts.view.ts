import {ApiProperty} from '@nestjs/swagger';
import {SuggestedContactsDto} from 'domain/dtos/response/suggested-contact';
import {PersonSuggestedContactView} from './person-suggested-contact.view';
import {OrganizationSuggestedContactView} from './organization-suggested-contact.view';

export class SuggestedContactsView extends SuggestedContactsDto {
    @ApiProperty({isArray: true, type: PersonSuggestedContactView})
    public persons: PersonSuggestedContactView[] = [];

    @ApiProperty({isArray: true, type: OrganizationSuggestedContactView})
    public organizations: OrganizationSuggestedContactView[] = [];
}
