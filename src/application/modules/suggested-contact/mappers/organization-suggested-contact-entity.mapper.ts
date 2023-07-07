import {OrganizationSuggestedContactDto} from 'domain/dtos/request/suggested-contact/organization-suggested-contact.dto';
import {OrganizationSuggestedContact} from 'domain/entities/organization-suggested-contact.entity';

export interface IOrganizationSuggestedContactEntityMapper {
    mapByOrganizationSuggestedContactDto(
        suggestedContactDto: OrganizationSuggestedContactDto,
    ): OrganizationSuggestedContact;
}

export const IOrganizationSuggestedContactEntityMapper = Symbol('IOrganizationSuggestedContactEntityMapper');
