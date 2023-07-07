import {ApiProperty} from '@nestjs/swagger';
import {EmergencyContactsDto} from 'domain/dtos/response/emergency-contact';
import {PersonEmergencyContactView} from './person-emergency-contact.view';
import {OrganizationEmergencyContactView} from './organization-emergency-contact.view';

export class EmergencyContactsView extends EmergencyContactsDto {
    @ApiProperty({isArray: true, type: PersonEmergencyContactView})
    public persons: PersonEmergencyContactView[] = [];

    @ApiProperty({isArray: true, type: OrganizationEmergencyContactView})
    public organizations: OrganizationEmergencyContactView[] = [];
}
